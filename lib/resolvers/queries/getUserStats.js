import { r } from '../../db'
import compileStats from '../../services/compileStats'
import { addRatingsForUser } from '../../services/addRatings'

export default (_, { id }) => {
  return r.table('seen')
    .getAll(id, { index: 'user' })
    .merge(user => user('movies').map(movie => r.table('movies').get(movie)))
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(data => data[0])
    .then(compileStats)
    .then(addRatingsForUser.bind(this, id))
}
