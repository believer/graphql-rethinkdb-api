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
import getMoviesWithRating from './queries/getMoviesWithRating'
import addToWatchlist from './mutations/addToWatchlist'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    feed: feed,

    movies: movies,
    getMovie: getMovie,
    getMoviesWithRating: getMoviesWithRating,

    getPerson: getPerson,

    getUser: getUser,
    getUserLatest: getUserLatest,
    getUserMovies: getUserMovies,
    getUserWatchlist: getUserWatchlist
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addToWatchlist: addToWatchlist
  }
})

export default new GraphQLSchema({
  query: Query,
  mutation: Mutation
})
