import { r } from '../../db'

export default (_, { id }) => {
  return r.table('watchlist')
    .getAll(id, { index: 'user' })
    .orderBy(r.desc('added'))
    .map(movie => r.table('movies').get(movie('movie')))
    .run(r.conn)
    .then(cursor => cursor.toArray())
}
