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
  description: 'Get a Users latest movie from User ID',
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
