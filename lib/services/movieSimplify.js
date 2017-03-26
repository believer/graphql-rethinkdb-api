import getNames from '../utils/getNames'
import getCrew  from '../utils/getCrew'
import _ from 'lodash'
import moment from 'moment'

function movieSimplify (movie) {
  return new Promise(function (resolve, reject) {
    movie.cast = getNames(movie.cast)
    movie.production_companies = getNames(movie.production_companies)
    movie.genres = getNames(movie.genres)
    movie.languages = getNames(movie.spoken_languages)
    movie.title = movie.original_title
    movie.year = movie.release_date.substr(0, 4) || 0
    movie.added = moment().unix()

    movie.ids = {
      imdb: movie.imdb_id,
      tmdb: movie.id.toString()
    }

    movie.images = {
      poster: movie.poster_path,
      backdrop: movie.backdrop_path
    }

    const crew = getCrew(movie.crew)
    movie = Object.assign({}, movie, crew)

    const skipProps = [
      'spoken_languages',
      'backdrop_path',
      'poster_path',
      'id',
      'imdb_id',
      'original_title',
      'crew'
    ]

    movie = _.omit(movie, skipProps)

    resolve(movie)
  })
}

export default movieSimplify
