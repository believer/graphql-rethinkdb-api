import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { r } from '../db'
import Stats from '../models/Stats'

import { addRatings } from '../services/addRatings'
import compileStats from '../services/compileStats'

export default {
  type: Stats,
  description: 'Get stats',
  resolve: () => {
    return r.table('movies')
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(compileStats)
      .then(addRatings)
  }
}
