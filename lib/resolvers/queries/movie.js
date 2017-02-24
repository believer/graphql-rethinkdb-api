import { r } from '../../db'

export default (_, { id }) => {
  return r
    .table('movies')
    .get(id)
    .run(r.conn)
}
