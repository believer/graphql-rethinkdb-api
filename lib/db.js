/* globals Promise: true, module: true, require: true */

var r = require('rethinkdb');
var _ = require('lodash');

function toMap(identifier) {
  return function (map, item, index, arr) {
    map[item[identifier]] = item;
    return map;
  };
}

function ensureDb (conn, dbName) {
  return r
    .dbList().run(conn)
    .then(function (cursor) { return cursor.toArray(); })
    .then(function (dbs) {
      if(dbs.indexOf(dbName) === -1) {
        return r
          .dbCreate(dbName).run(conn)
          .then(function () {
            return conn;
          });
      } else {
        return conn;
      }
    });
}

function ensureTables () {
  var expectedTables = [
    'actors',
    'composers',
    'movies'
  ];

  return r
    .tableList().run(r.conn)
    .then(function (cursor) { return cursor.toArray(); })
    .then(function (existingTables) {
      return Promise.all(_.difference(expectedTables, existingTables)
        .map(function (table) {
          return r.tableCreate(table).run(r.conn);
        }));
    });
}

function connect(config) {
  return r.connect(_.omit(config, 'db'))
    .then(function (conn) { r.conn = conn; return conn; })
    .then(function (conn) { return ensureDb(conn, config.db); })
    .then(function (conn) { return conn.use(config.db); })
    .then(ensureTables)
    .then(function () {
      return r.conn;
    });
}

function ensureData(tableName, data, identifier) {
  return r.table(tableName)
    .run(r.conn)
    .then(function (cursor) { return cursor.toArray(); })
    .then(function (existing) {
      var existingRows = existing.reduce(toMap(identifier), {});
      var newRows = data.reduce(toMap(identifier), {});

      return Promise.all(Object.keys(newRows)
        .filter(function (key) { return !existingRows[key]; })
        .map(function (key) {
          return r.table(tableName).insert(newRows[key]).run(r.conn);
        }));
    });
}

module.exports = {
  connect: connect,
  r: r
};
