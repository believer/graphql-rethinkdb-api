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
    }
  },
  resolve: (root, { limit }) => {
    limit = limit || 50

    return r
      .table('movies')
      .limit(limit)
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
