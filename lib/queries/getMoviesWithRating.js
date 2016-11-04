import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'
import args from '../helpers/args'

export default {
  type: new GraphQLList(Movie),
  description: 'Get movies with a specific User rating',
  args: args(['rating', 'limit', 'skip']),

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
