import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'
import db from './db'

const app = express()

const config = {
  port: process.env.PORT || 5000
}

const startServer = () =>
  new Promise((resolve, reject) => {
    app.use('/graphql', graphqlHTTP({
      schema,
      graphiql: true
    }))

    app.listen(config.port, () => {
      resolve(config.port)
    })
  })

db.connectDb()
  .then(() => console.log('Db started'))
  .then(startServer)
  .then(port => console.log(`Server started on port ${port}`))
  .catch(err => console.error('Server error', err))
