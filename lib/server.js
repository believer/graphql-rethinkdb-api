import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import db from './db'
import buildSchema from './schema'

const config = {
  port: process.env.PORT || 4000
}

const startServer = (schema) =>
  new Promise((resolve, reject) => {
    const app = express()

    app.use(cors())
    app.use(json())

    app.use('/graphql', graphqlExpress({ schema }))
    app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

    app.listen(config.port, () => {
      resolve(config.port)
    })
  })

db.connectDb()
  .then(() => console.log('Db started'))
  .then(() => buildSchema)
  .then(startServer)
  .then(port => console.log(`Server started on port ${port}`))
  .catch(err => console.error('Server error', err))
