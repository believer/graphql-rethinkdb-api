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
  resolve: (root, { id, skip, limit }) => {
    limit = limit || 50
    skip = skip || 0

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
              .getAll(movie('id'), { index: 'movie' })
              .filter(views => views('user').eq(id))
              .pluck('date')
              .coerceTo('array'),
            rating: r.table('ratings')
              .getAll(movie('id'), { index: 'movie' })
              .filter(ratings => ratings('user').eq(id))
              .pluck('rating')
              .coerceTo('array')('rating')
              .reduce((left, right) => left.add(right))
          }))
      ))
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(data => data[0])
  }
}
