import { r } from '../../db'

export default (_, { limit, skip }) => {
  return r
    .table('movies')
    .skip(skip)
    .limit(limit)
    .run(r.conn)
    .then(cursor => cursor.toArray())
}
