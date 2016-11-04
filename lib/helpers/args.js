import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from 'graphql'

const allArguments = {
  id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  limit: {
    type: GraphQLInt
  },
  name: {
    type: new GraphQLNonNull(GraphQLString)
  },
  rating: {
    type: new GraphQLNonNull(GraphQLInt)
  },
  skip: {
    type: GraphQLInt
  },
  type: {
    type: new GraphQLNonNull(GraphQLString)
  }
}

export default function (args) {
  let returnArgs = {}

  if (typeof args === 'string') {
    return { [`${args}`]: allArguments[args] }
  }

  args.forEach(arg => {
    returnArgs = Object.assign({}, returnArgs, { [`${arg}`]: allArguments[arg] })
  })

  return returnArgs
}
