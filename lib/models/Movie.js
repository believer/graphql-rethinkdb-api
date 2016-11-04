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
import User from './User'

const Awards = new GraphQLObjectType({
  name: 'Awards',
  fields: {
    nominations: { type: GraphQLInt },
    text: { type: GraphQLString },
    wins: { type: GraphQLInt }
  }
})

const Ids = new GraphQLObjectType({
  name: 'Ids',
  fields: {
    imdb: { type: GraphQLString },
    tmdb: { type: GraphQLString }
  }
})

const Images = new GraphQLObjectType({
  name: 'Images',
  fields: {
    backdrop: { type: GraphQLString },
    poster: { type: GraphQLString }
  }
})

const Imdb = new GraphQLObjectType({
  name: 'Imdb',
  fields: {
    rating: { type: GraphQLFloat },
    votes: { type: GraphQLInt }
  }
})

const Metacritic = new GraphQLObjectType({
  name: 'Metacritic',
  fields: {
    rating: { type: GraphQLInt },
  }
})

const Tomatoes = new GraphQLObjectType({
  name: 'Tomatoes',
  fields: {
    consensus: { type: GraphQLString },
    fresh: { type: GraphQLInt },
    image: { type: GraphQLString },
    meter: { type: GraphQLInt },
    rating: { type: GraphQLInt },
    reviews: { type: GraphQLInt },
    userMeter: { type: GraphQLInt },
    userRating: { type: GraphQLFloat },
    userReviews: { type: GraphQLInt }
  }
})

const Ratings = new GraphQLObjectType({
  name: 'Ratings',
  fields: {
    imdb: { type: Imdb },
    metacritic: { type: Metacritic },
    tomatoes: { type: Tomatoes }
  }
})

const Dates = new GraphQLObjectType({
  name: 'Dates',
  fields: {
    date: { type: GraphQLString }
  }
})

export default new GraphQLObjectType({
  name: 'Movie',
  fields: {
    added: { type: GraphQLInt },
    averageRating: { type: GraphQLFloat },
    awards: { type: Awards },
    cast: { type: new GraphQLList(GraphQLString) },
    countries: { type: new GraphQLList(GraphQLString) },
    date: { type: GraphQLString },
    dates: { type: new GraphQLList(Dates) },
    director: { type: new GraphQLList(GraphQLString) },
    genres: { type: new GraphQLList(GraphQLString) },
    id: { type: GraphQLString },
    ids: { type: Ids },
    images: { type: Images },
    languages: { type: new GraphQLList(GraphQLString) },
    music: { type: new GraphQLList(GraphQLString) },
    title: { type: GraphQLString },
    overview: {
      type: GraphQLString,
      args: {
        truncate: {
          type: GraphQLInt
        }
      },
      resolve(movie, { truncate }) {
        return movie.overview.substr(0, truncate)
      }
    },
    production_companies: { type: new GraphQLList(GraphQLString) },
    rating: { type: GraphQLInt },
    ratings: { type: Ratings },
    release_date: { type: GraphQLString },
    runtime: { type: GraphQLInt },
    tagline: { type: GraphQLString },
    title: { type: GraphQLString },
    user: { type: User },
    wilhelm: { type: GraphQLBoolean },
    writer: { type: new GraphQLList(GraphQLString) },
    year: { type: GraphQLString }
  }
})
