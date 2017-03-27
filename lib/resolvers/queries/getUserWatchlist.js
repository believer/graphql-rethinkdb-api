import { r } from '../../db'
import { toArray, table } from '../../utils/helpers'

export default (_, { id }) => {
  const query = table('watchlist')
    .getAll(id, { index: 'user' })
    .orderBy(r.desc('added'))
    .map(movie => r.table('movies').get(movie('movie')))

  return toArray(query)
}
