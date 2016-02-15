import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'
import { r } from './db'

import movies from './queries/movies'
import getMovie from './queries/getMovie'
import getUser from './queries/getUser'
import getUserLatest from './queries/getUserLatest'
import getUserMovies from './queries/getUserMovies'
import getMoviesWithRating from './queries/getMoviesWithRating'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: movies,
    getMovie: getMovie,

    getUser: getUser,
    getUserLatest: getUserLatest,
    getUserMovies: getUserMovies,

    getMoviesWithRating: getMoviesWithRating
  }
})

export default new GraphQLSchema({
  query: Query
})
