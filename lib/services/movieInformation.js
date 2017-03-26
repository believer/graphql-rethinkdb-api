import _ from 'lodash'

function movieInformation (movie) {
  const props = [
    'backdrop_path',
    'genres',
    'id',
    'imdb_id',
    'overview',
    'original_title',
    'poster_path',
    'production_companies',
    'release_date',
    'runtime',
    'spoken_languages',
    'tagline'
  ]

  movie = _.pick(movie, props)

  return movie
}

export default movieInformation
