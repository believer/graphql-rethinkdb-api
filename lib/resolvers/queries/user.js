import { get } from '../../utils/helpers'

export default (_, { id }) => {
  return get('users')(id)
}
