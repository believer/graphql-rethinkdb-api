import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'
import args from '../helpers/args'

export default {
  type: Movie,
  description: 'Get a Movie by ID',
  args: args('id'),

  resolve: (root, { id }) => {
    return r
      .table('movies')
      .get(id)
      .run(r.conn)
  }
}
