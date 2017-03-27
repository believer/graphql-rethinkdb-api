import compileStats from '../../services/compileStats'
import { addRatings } from '../../services/addRatings'
import { table, toArray } from '../../utils/helpers'

export default () => {
  return toArray(table('movies'))
    .then(compileStats)
    .then(addRatings)
}
