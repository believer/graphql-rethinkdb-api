import { r } from '../../db'

export default (_, { id }) => {
  return r
    .table('users')
    .get(id)
    .run(r.conn)
}
