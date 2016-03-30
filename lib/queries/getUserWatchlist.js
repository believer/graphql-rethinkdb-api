import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: new GraphQLList(Movie),
  description: 'Get a Users watchlist',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, { id }) => {
    return r.table('watchlist')
      .getAll(id, { index: 'user' })
      .orderBy(r.desc('added'))
      .map(movie => r.table('movies').get(movie('movie')))
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
