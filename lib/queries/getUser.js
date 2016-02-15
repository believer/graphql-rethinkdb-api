import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import User from '../models/User'

export default {
  type: User,
  description: 'Get a User by ID',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, { id }) => {
    return r
      .table('users')
      .get(id)
      .run(r.conn)
  }
}
