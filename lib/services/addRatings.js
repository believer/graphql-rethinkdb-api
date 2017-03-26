import { r } from '../db'
import { table, getAll, toArray } from '../utils/helpers'
import sortRatings from '../services/sortRatings'

export const addRatings = (stats) =>
  toArray(table('ratings'))
    .then(sortRatings.bind(this, stats))

export const addRatingsForUser = (userId, stats) =>
  toArray(getAll('rating')(userId)('user'))
    .then(sortRatings.bind(this, stats))
