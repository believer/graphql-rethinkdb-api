import { r } from '../../db'
import { toArray, table } from '../../utils/helpers'

export default (_, { name, type }) => {
  const query = table('movies')
    .filter(r.row(type).contains(name))
    .orderBy(r.desc('release_date'))

  return toArray(query)
}
