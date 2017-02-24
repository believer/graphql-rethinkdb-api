import { r } from '../../db'

export default (_, { rating, skip, limit }) => {
  return r.table('ratings')
    .skip(skip)
    .limit(limit)
    .filter(r.row('rating').ge(rating))
    .merge(rating => (
      r.table('movies').get(rating('movie'))
    ))
    .run(r.conn)
    .then(cursor => cursor.toArray())
}
