import { r } from '../../db'
import { table, toArray } from '../../utils/helpers'

export default (_, { rating, skip, limit }) => {
  const query = table('ratings')
    .skip(skip)
    .limit(limit)
    .filter(r.row('rating').ge(rating))
    .merge(rating => (
      r.table('movies').get(rating('movie'))
    ))

  return toArray(query)
}
