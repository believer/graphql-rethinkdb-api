import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    email: { type: GraphQLString },
    id: { type: GraphQLString },
    password: { type: GraphQLString }
  }
})
