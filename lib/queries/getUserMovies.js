import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: new GraphQLList(Movie),
  description: 'Get a Users latest NEW movies from User ID',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    limit: {
      type: GraphQLInt
    },
    skip: {
      type: GraphQLInt
    }
  },
  resolve: (root, { id, skip = 0, limit = 50 }) => {
    return r.table('seen')
      .getAll(id, { index: 'user' })
      .merge(user => (
        user('movies')
          .skip(skip)
          .limit(limit)
          .map(movie => ({ id: movie }))
          .merge(movie => r.table('movies').get(movie('id')))
          .merge(movie => ({
            dates: r.table('views')
              .getAll([movie('id'), id], { index: 'movieUser' })
              .pluck('date')
              .coerceTo('array'),
            rating: r.table('ratings')
              .getAll([movie('id'), id], { index: 'movieUser' })
              .pluck('rating')('rating')
              .coerceTo('array')
          }))
      ))
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(data => data[0])
  }
}
