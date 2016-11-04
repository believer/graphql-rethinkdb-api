import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import User from '../models/User'
import args from '../helpers/args'

export default {
  type: User,
  description: 'Get a User by ID',
  args: args('id'),

  resolve: (root, { id }) => {
    return r
      .table('users')
      .get(id)
      .run(r.conn)
  }
}
