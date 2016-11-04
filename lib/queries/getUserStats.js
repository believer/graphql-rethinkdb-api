import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Stats from '../models/Stats'

import { addRatingsForUser } from '../services/addRatings'
import compileStats from '../services/compileStats'
import args from '../helpers/args'

export default {
  type: Stats,
  description: 'Get stats',
  args: args('id'),

  resolve: (root, { id }) => {
    return r.table('seen')
      .getAll(id, { index: 'user' })
      .merge(user => user('movies').map(movie => r.table('movies').get(movie)))
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(data => data[0])
      .then(compileStats)
      .then(addRatingsForUser.bind(this, id))
  }
}
