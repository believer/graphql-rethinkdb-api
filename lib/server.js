import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import db from './db'
import buildSchema from './schema'

const config = {
  port: process.env.PORT || 4000
}

const app = express()

const startApp = schema => new Promise((resolve, reject) => {
  app.use('/graphql', graphqlExpress({ schema }))
  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

  app.listen(config.port, () => {
    resolve(config.port)
  })
})

app.use(cors())
app.use(json())

db.connectDb()
  .then(() => console.log('Db started'))
  .then(() => buildSchema)
  .then(startApp)
  .then(port => console.log(`Server started on port ${port}`))
  .catch(err => console.error('Server error', err))
