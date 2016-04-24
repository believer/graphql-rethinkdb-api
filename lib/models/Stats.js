import {
  graphql,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
  GraphQLString
} from 'graphql'

import Movie from './Movie'

const Collection = new GraphQLObjectType({
  name: 'Collection',
  fields: {
    name: { type: GraphQLString },
    movies: { type: GraphQLInt }
  }
})

const Time = new GraphQLObjectType({
  name: 'Time',
  fields: {
    minutes: { type: GraphQLInt },
    hours: { type: GraphQLInt },
    days: { type: GraphQLInt },
    year: { type: GraphQLFloat },
    adjustedMinutes: { type: GraphQLInt }
  }
})

let years = {}
let currentYear = parseInt(new Date().getFullYear(), 10)

for (var year = 1900; year <= currentYear; year++) {
  years[`y${year}`] = { type: GraphQLInt }
}

const Years = new GraphQLObjectType({
  name: 'Years',
  fields: years
})

const Numbers = new GraphQLObjectType({
  name: 'Numbers',
  fields: {
    actors: { type: GraphQLInt },
    composers: { type: GraphQLInt },
    directors: { type: GraphQLInt },
    genres: { type: GraphQLInt },
    languages: { type: GraphQLInt },
    productionCompanies: { type: GraphQLInt },
    writers: { type: GraphQLInt }
  }
})

export default new GraphQLObjectType({
  name: 'Stats',
  fields: {
    actors: { type: new GraphQLList(Collection) },
    composers: { type: new GraphQLList(Collection) },
    directors: { type: new GraphQLList(Collection) },
    genres: { type: new GraphQLList(Collection) },
    languages: { type: new GraphQLList(Collection) },
    numbers: { type: Numbers },
    productionCompanies: { type: new GraphQLList(Collection) },
    ratings: { type: new GraphQLList(GraphQLInt) },
    rewatches: { type: Movie },
    time: {
      type: Time
    },
    total: { type: GraphQLInt },
    years: { type: Years },
    wilhelms: { type: GraphQLInt },
    writers: { type: new GraphQLList(Collection) }
  }
})
