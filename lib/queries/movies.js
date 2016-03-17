import {
  GraphQLInt,
  GraphQLList,
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: new GraphQLList(Movie),
  description: 'List all movies',
  args: {
    limit: {
      type: GraphQLInt
    },
    skip: {
      type: GraphQLInt
    }
  },
  resolve: (root, { limit = 50, skip = 0 }) => {
    return r
      .table('movies')
      .skip(skip)
      .limit(limit)
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
