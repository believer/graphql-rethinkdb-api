import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'
import { r } from './db'

import movies from './queries/movies'
import feed from './queries/feed'
import getMovie from './queries/getMovie'
import getUser from './queries/getUser'
import getPerson from './queries/getPerson'
import getUserLatest from './queries/getUserLatest'
import getUserMovies from './queries/getUserMovies'
import getUserWatchlist from './queries/getUserWatchlist'
import getUserStats from './queries/getUserStats'
import getMoviesWithRating from './queries/getMoviesWithRating'
import getStats from './queries/getStats'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    /* Friend feed */
    feed: feed,

    /* Movies */
    movies: movies,
    getMovie: getMovie,
    getMoviesWithRating: getMoviesWithRating,

    /* Cast */
    getPerson: getPerson,

    /* User */
    getUser: getUser,
    getUserLatest: getUserLatest,
    getUserMovies: getUserMovies,
    getUserStats: getUserStats,
    getUserWatchlist: getUserWatchlist,

    /* Stats */
    getStats: getStats
  }
})

export default new GraphQLSchema({
  query: Query
})
