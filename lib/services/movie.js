import tmdb from './tmdb'
import movieInformation from './movieInformation'
import movieSimplify from './movieSimplify'
import omdb from './omdb'

function movie (id) {
  return tmdb.info(id)
    .then(movieInformation)
    .then(tmdb.credits)
    .then(movieSimplify)
    .then(omdb)
    .catch(error => reject(error))
}

export default movie
