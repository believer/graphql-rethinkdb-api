import { r } from '../db'
import sortRatings from '../services/sortRatings'

export function addRatings (stats) {
  return r.table('ratings')
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(sortRatings.bind(this, stats))
}

export function addRatingsForUser (userId, stats) {
  return r.table('ratings')
    .getAll(userId, { index: 'user' })
    .run(r.conn)
    .then(cursor => cursor.toArray())
    .then(sortRatings.bind(this, stats))
}
