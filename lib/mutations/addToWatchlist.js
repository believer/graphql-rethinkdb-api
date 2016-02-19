import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} from 'graphql'
import { r } from '../db'
import Movie from '../models/Movie'

export default {
  type: GraphQLString,
  description: 'Add a movie to a Users watchlist',
  args: {
    imdb: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'IMDb ID of a movie'
    },
    user: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'User ID in DB'
    }
  },
  resolve: (root, { imdb, user }) => {
    console.log(imdb, user)

    return r.table('movies')
      .getAll(imdb, { index: 'imdb' })
      .run(r.conn)
      .then(cursor => cursor.toArray())
  }
}
