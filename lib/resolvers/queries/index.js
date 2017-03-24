import feed from './feed'
import movie from './movie'
import movies from './movies'
import getMoviesWithRating from './getMoviesWithRating'
import getUserLatest from './getUserLatest'
import getUserWatchlist from './getUserWatchlist'
import getUserMovies from './getUserMovies'
import getPerson from './getPerson'
import user from './user'
import getStats from './getStats'
import getUserStats from './getUserStats'
import search from './search'

export default Object.assign({}, {
  feed,
  movie,
  movies,
  getPerson,
  getUserLatest,
  getMoviesWithRating,
  getUserWatchlist,
  getUserMovies,
  getStats,
  getUserStats,
  search,
  user
})
