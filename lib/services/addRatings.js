import { r } from '../db'
import sortRatings from '../services/sortRatings'

export const addRatings = (stats) =>
  r.table('ratings')
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(sortRatings.bind(this, stats))

export const addRatingsForUser = (userId, stats) =>
  r.table('ratings')
    .getAll(userId, { index: 'user' })
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(sortRatings.bind(this, stats))
