  import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
  } from 'graphql'
  import { r } from '../db'
  import Movie from '../models/Movie'

  export default {
    type: new GraphQLList(Movie),
    description: 'Get movies with a person in a specific role',
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString)
      },
      type: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, { name, type }) => {
      return r
        .table('movies')
      	.filter(r.row(type).contains(name))
      	.orderBy(r.desc('release_date'))
        .run(r.conn)
        .then(cursor => cursor.toArray())
    }
  }
