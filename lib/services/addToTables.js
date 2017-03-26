import { r } from '../db'
import { insert, updateSeen, getAll, toArray, run } from '../utils/helpers'
import moment from 'moment'

function addToUser (userid, id) {
  return updateSeen(userid)({
    movies: r.row('movies').prepend(id)
  })
}

function updateUser (userid, id) {
  return toArray(getAll('seen')(userid)('user')
    .filter(r.row('movies').contains(movie => movie.eq(id))))
    .then(exists => {
      if (!exists.length) {
        return addToUser(userid, id)
      }
    })
}

function view (user, date, movie) {
  date = date ? moment(date).format() : moment().format()

  return insert('views')({ date, movie, user })
}

function addRating (user, rating, movie) {
  return insert('ratings')({ rating, movie, user })
}

function updateRating (userid, rating, id) {
  return toArray(getAll('ratings')(userid)('user')
    .filter(ratings => ratings('movie').eq(id)))
    .then(exists => {
      if (!exists.length) {
        return addRating(userid, rating, id)
      } else {
        return run(getAll('ratings')(userid)('user')
          .filter(r.row('movie').eq(id))
          .update({ rating }))
      }
    })
}

module.exports = {
  user: addToUser,
  updateUser: updateUser,
  view: view,
  addRating: addRating,
  updateRating: updateRating
}
