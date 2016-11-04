/* globals Promise: true, module: true, require: true */

const r = require('rethinkdb')
const _ = require('lodash')

const config = {
  host: process.env.RETHINKDB_HOST,
  port: process.env.RETHINKDB_PORT,
  db: process.env.RETHINKDB_DB
}

function connectDb () {
  return connect(config)
    .then(conn => config)
}

function toMap(identifier) {
  return (map, item, index, arr) => {
    map[item[identifier]] = item
    return map
  }
}

function ensureDb (conn, dbName) {
  return r
    .dbList().run(conn)
    .then(cursor => cursor.toArray())
    .then(dbs => {
      if (dbs.indexOf(dbName) === -1) {
        return r
          .dbCreate(dbName).run(conn)
          .then(() => conn)
      }

      return conn
    })
}

function ensureTables () {
  const expectedTables = [
    'actors',
    'composers',
    'movies'
  ]

  return r
    .tableList().run(r.conn)
    .then(cursor => cursor.toArray())
    .then(existingTables =>
      Promise
        .all(_.difference(expectedTables, existingTables)
        .map(table => r.tableCreate(table).run(r.conn)))
    )
}

function connect (config) {
  return r.connect(_.omit(config, 'db'))
    .then(conn => {
      r.conn = conn
      return conn
    })
    .then(conn => ensureDb(conn, config.db))
    .then(conn => conn.use(config.db))
    .then(ensureTables)
    .then(() => r.conn)
}

function ensureData (tableName, data, identifier) {
  return r.table(tableName)
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(existing => {
      const existingRows = existing.reduce(toMap(identifier), {})
      const newRows = data.reduce(toMap(identifier), {})

      return Promise.all(Object.keys(newRows)
        .filter(key => !existingRows[key])
        .map(key => r.table(tableName).insert(newRows[key]).run(r.conn)))
    })
}

module.exports = {
  connectDb,
  connect,
  r
}
