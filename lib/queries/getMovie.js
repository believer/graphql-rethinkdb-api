import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: Movie,
  description: 'Get a Movie by ID',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, { id }) => {
    return r
      .table('movies')
      .get(id)
      .run(r.conn)
  }
}
