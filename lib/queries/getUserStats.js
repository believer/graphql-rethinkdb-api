import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Stats from '../models/Stats'

import compileStats from '../services/compileStats'

export default {
  type: Stats,
  description: 'Get stats',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, { id }) => {
    return r.table('seen')
      .getAll(id, { index: 'user' })
      .merge(user => user('movies').map(movie => r.table('movies').get(movie)))
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(data => data[0])
      .then(compileStats)
  }
}
