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
      .merge(user => (
        user('movies')
          .map(movie => ({ id: movie }))
          .merge(movie => r.table('movies').get(movie('id')))
          .merge(movie => ({
            dates: r.table('views')
              .getAll([movie('id'), id], { index: 'movieUser' })
              .pluck('date')
              .coerceTo('array')
          }))
      ))
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(data => data[0])
      .then(compileStats)
      // .then(console.log.bind(console))
  }
}
