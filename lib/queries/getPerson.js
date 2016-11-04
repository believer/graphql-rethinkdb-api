  import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
  } from 'graphql'
  import { r } from '../db'
  import Movie from '../models/Movie'
  import args from '../helpers/args'

  export default {
    type: new GraphQLList(Movie),
    description: 'Get movies with a person in a specific role',
    args: args(['name', 'type']),
    
    resolve: (root, { name, type }) => {
      return r
        .table('movies')
      	.filter(r.row(type).contains(name))
      	.orderBy(r.desc('release_date'))
        .run(r.conn)
        .then(cursor => cursor.toArray())
    }
  }
