import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: new GraphQLList(Movie),
  description: 'Get movies with a specific User rating',
  args: {
    rating: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    limit: {
      type: GraphQLInt
    },
    skip: {
      type: GraphQLInt
    }
  },
  resolve: (root, { rating = 0, skip = 0, limit = 50 }) => {
    return r.table('ratings')
      .skip(skip)
      .limit(limit)
      .filter(r.row('rating').ge(rating))
      .merge(rating => (
        r.table('movies').get(rating('movie'))
      ))
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
