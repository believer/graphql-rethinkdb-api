const restify = require('restify')
import { graphql } from 'graphql'
const db = require('./db')
import schema from './schema'

const config = {
  port: process.env.PORT || 5000
}

function startServer () {
  return new Promise((resolve, reject) => {
    const server = restify.createServer({ name: 'API-v2' })

    server.use(restify.CORS())
    server.use(restify.bodyParser())

    server.use((req, res, next) => {
      res.charSet('utf-8')
      return next()
    })

    server.post('/', (req, res, next) => {
      graphql(schema, req.body)
        .then(result => {
          res.send(result)
          return next()
        })
    })

    server.listen(config.port, err => {
      if (err) { reject(err) }
      else { resolve(config.port) }
    })
  })
}

db.connectDb()
  .then(() => console.log('Db started'))
  .then(startServer)
  .then(() => console.log(`Server started on port ${config.port}`))
  .catch(err => console.error('Server error', err))
