import { r } from '../../db'

export default (_, { id, skip, limit }) => {
  return r.table('views')
    .getAll(id, { index: 'user' })
    .orderBy(r.desc('date'))
    .pluck('movie')
    .skip(skip)
    .limit(limit)
    .map(movie => ({
      id: movie('movie')
    }))
    .merge(movie =>
      r.table('movies')
        .get(movie('id'))
    )
    .run(r.conn)
    .then(cursor => cursor.toArray())
}
