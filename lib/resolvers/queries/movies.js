import { table, toArray } from '../../utils/helpers'

export default (_, { limit, skip }) => {
  const query = table('movies')
    .skip(skip)
    .limit(limit)
  
  return toArray(query)
}
