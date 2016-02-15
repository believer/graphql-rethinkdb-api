var restify = require('restify');
import { graphql } from 'graphql'
var db = require('./db');
import schema from './schema'
import graphqlHTTP from 'express-graphql'

var port = process.env.PORT || 5000;
var config = {
  "port": port,
  "rethinkdb": {
    "host": process.env.RETHINKDB_HOST,
    "port": process.env.RETHINKDB_PORT,
    "db": process.env.RETHINKDB_DB
  }
};

function connectDb() {
  return db
    .connect(config.rethinkdb)
    .then(function (conn) {
      return config.rethinkdb;
    });
}

function startServer() {
  return new Promise(function (resolve, reject) {
    var server = restify.createServer({ name: 'API-v2' });

    server.pre(restify.pre.sanitizePath());
    server.use(restify.CORS());
    server.use(restify.fullResponse());
    server.use(restify.queryParser());
    server.use(restify.bodyParser());

    server.use(function (req, res, next) {
      res.charSet('utf-8')
      return next();
    });

    server.get('/graphql', graphqlHTTP({
      schema: schema
    }))

    server.post('/', (req, res, next) => {
      graphql(schema, req.body)
        .then(result => {
          res.send(result)
        })
    })

    server.listen(config.port, function (err) {
      if(err) { reject(err); }
      else { resolve(config.port); }
    });
  });
}

connectDb()
  .then(console.log.bind(console, 'Db started'))
  .then(startServer)
  .then(console.log.bind(console, 'Server started on port'))
  .catch(console.error.bind(console, 'Error'));
