import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'
import loadGqlFiles from './build/fileLoader'

const path = require('path').resolve(__dirname, './**/*.graphql')

export default loadGqlFiles(path)
  .then(typeDefs => makeExecutableSchema({
    typeDefs,
    resolvers
  }))
