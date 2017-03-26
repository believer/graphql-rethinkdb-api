import { r } from '../db'

export const table = (tableName) => r.table(tableName)
export const run = (query) => query.run(r.conn)
export const toArray = (query) =>
  run(query).then(cursor => cursor.toArray())

export const insert = (tableName) => (insert) =>
  run(table(tableName).insert(insert))

export const get = (tableName) => (id) =>
  run(table(tableName).get(id))

export const getAll = (tableName) => (value) => (index) =>
  table(tableName).getAll(value, { index })

export const updateSeen = (user) => (update) =>
  run(getAll('seen')(user)('user').update(update))
