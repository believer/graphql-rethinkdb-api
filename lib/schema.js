import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql'
import { r } from './db'

import Movie from './models/Movie'
import movies from './queries/movies'
import getMovie from './queries/getMovie'

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: movies,
    getMovie: getMovie
  }
})

export default new GraphQLSchema({
  query: Query
})
