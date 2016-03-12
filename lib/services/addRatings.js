var _ = require('lodash')
import { r } from '../db'

export default function addRatings (stats) {
  return new Promise(function (resolve, reject) {
    var ratingsArray = {
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
