import _ from 'lodash'
import { r } from '../db'

export function addRatings (stats) {
  return new Promise(function (resolve, reject) {
    const ratingsArray = {
      ratings: [0,0,0,0,0,0,0,0,0,0,0]
    }

    r.table('ratings')
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(ratings => {
        ratings.forEach((rating, i) => {
          ratingsArray.ratings[rating.rating]++

          if (i === ratings.length - 1) {
            resolve(_.merge(ratingsArray, stats))
          }
        })
      })
  })
}

export function addRatingsForUser (stats, userId) {
  return new Promise(function (resolve, reject) {
    const ratingsArray = {
      ratings: [0,0,0,0,0,0,0,0,0,0,0]
    }

    r.table('ratings')
      .getAll(userId, { index: 'user' })
      .run(r.conn)
      .then(cursor => cursor.toArray())
      .then(ratings => {
        ratings.forEach((rating, i) => {
          ratingsArray.ratings[rating.rating]++

          if (i === ratings.length - 1) {
            resolve(_.merge(ratingsArray, stats))
          }
        })
      })
  })
}
