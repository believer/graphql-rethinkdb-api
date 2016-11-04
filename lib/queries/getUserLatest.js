import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'
import args from '../helpers/args'

export default {
  type: new GraphQLList(Movie),
  description: 'Get a Users latest movie from User ID',
  args: args(['id', 'limit', 'skip']),

  resolve: (root, { id, skip = 0, limit = 50 }) => {
    return r.table('views')
      .getAll(id, { index: 'user' })
      .orderBy(r.desc('date'))
      .pluck('movie')
      .skip(skip)
      .limit(limit)
      .map(movie => ({
        id: movie('movie')
      }))
      .merge(movie =>
        r.table('movies')
          .get(movie('id'))
      )
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
