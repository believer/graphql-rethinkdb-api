import {
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: new GraphQLList(Movie),
  description: 'Get activity feed',
  args: {
    limit: {
      type: GraphQLInt
    },
    skip: {
      type: GraphQLInt
    }
  },
  resolve: (root, { limit, skip }) => {
    limit = limit || 50
    skip = skip || 0

    return r.table('views')
      .orderBy(r.desc('date'))
      .skip(skip)
      .limit(limit)
      .merge(view => (
        r.table('movies').get(view('movie'))
      ))
      .merge(view => ({
        user: r.table('users').get(view('user')).without('password'),
        rating: r.table('ratings')
          .getAll(view('movie'), { index: 'movie' })
          .filter(ratings => ratings('user').eq(view('user')))
          .coerceTo('array')
          .pluck('rating')('rating')(0)
      }))
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}