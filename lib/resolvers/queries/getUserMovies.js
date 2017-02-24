import { r } from '../../db'

export default (_, { id, skip, limit }) => {
  return r.table('seen')
    .getAll(id, { index: 'user' })
    .merge(user => (
      user('movies')
        .skip(skip)
        .limit(limit)
        .map(movie => ({ id: movie }))
        .merge(movie => r.table('movies').get(movie('id')))
        .merge(movie => ({
          dates: r.table('views')
            .getAll([movie('id'), id], { index: 'movieUser' })
            .pluck('date')
            .coerceTo('array'),
          rating: r.table('ratings')
            .getAll([movie('id'), id], { index: 'movieUser' })
            .pluck('rating')('rating')
            .coerceTo('array'),
          averageRating: r.table('ratings')
            .getAll(movie('id'), { index: 'movie' })
            .pluck('rating')('rating')
            .coerceTo('array')
            .avg()
        }))
    ))
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(data => data[0])
}
