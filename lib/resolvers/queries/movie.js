import { get } from '../../utils/helpers'

export default (_, { id }) => {
  return get('movies')(id)
}
