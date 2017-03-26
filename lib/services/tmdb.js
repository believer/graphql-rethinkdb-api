import moviedb from 'moviedb'
import _ from 'lodash'

const mdb = moviedb(process.env.TMDB_KEY)

function credits (movie) {
  return new Promise((resolve, reject) => {
    mdb.movieCredits({ id: movie.imdb_id }, (err, credits) => {
      if (err) { reject(err) }
      const movieWithCredits = _.merge(movie, credits)
      resolve(movieWithCredits)
    })
  })
}

function info (id) {
  return new Promise((resolve, reject) => {
    mdb.movieInfo({ id }, (err, information) => {
      if (err) { reject(err) }
      resolve(information)
    })
  })
}

module.exports = {
  info: info,
  credits: credits
}
