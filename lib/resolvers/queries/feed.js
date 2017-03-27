import { r } from '../../db'
import { getAll, toArray } from '../../utils/helpers'

const findMovie = (view) => getAll('ratings')(view('movie'))('movie')

const rating = (view) =>
  findMovie(view)
    .filter(ratings => ratings('user').eq(view('user')))
    .coerceTo('array')
    .pluck('rating')('rating')(0)

const averageRating = (view) =>
  findMovie(view)
    .pluck('rating')('rating')
    .coerceTo('array')
    .avg()

export default (_, { limit, skip }) => {
  return toArray(r.table('views')
    .orderBy(r.desc('date'))
    .skip(skip)
    .limit(limit)
    .merge(view => r.table('movies').get(view('movie')).without('date'))
    .merge(view => ({
      user: r.table('users').get(view('user')).without('password'),
      rating: rating(view),
      averageRating: averageRating(view)
    })))
}
