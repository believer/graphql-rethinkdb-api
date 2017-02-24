import { r } from '../../db'
import compileStats from '../../services/compileStats'
import { addRatings } from '../../services/addRatings'

export default () => {
  return r.table('movies')
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(compileStats)
    .then(addRatings)
}
