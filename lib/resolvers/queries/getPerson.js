import { r } from '../../db'

export default (_, { name, type }) => {
  return r
    .table('movies')
    .filter(r.row(type).contains(name))
    .orderBy(r.desc('release_date'))
    .run(r.conn)
    .then(cursor => cursor.toArray())
}
