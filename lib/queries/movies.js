import {
  GraphQLInt,
  GraphQLList,
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'
import args from '../helpers/args'

export default {
  type: new GraphQLList(Movie),
  description: 'List all movies',
  args: args(['skip', 'limit']),

  resolve: (root, { limit = 50, skip = 0 }) => {
    return r
      .table('movies')
      .skip(skip)
      .limit(limit)
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
