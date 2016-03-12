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

for (var year = 1900; year < currentYear; year++) {
  years[year] = GraphQLInt
}

const Year = new GraphQLObjectType({
  name: 'Year',
  fields: years
})

const Numbers = new GraphQLObjectType({
  name: 'Numbers',
  fields: {
    actors: { type: GraphQLInt },
    directors: { type: GraphQLInt },
    composers: { type: GraphQLInt },
    genres: { type: GraphQLInt },
    productionCompanies: { type: GraphQLInt },
    languages: { type: GraphQLInt }
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
    rewatches: { type: new GraphQLList(Movie) },
    time: {
      type: Time
    },
    total: { type: GraphQLInt },
    wilhelms: { type: GraphQLInt }
  }
})
