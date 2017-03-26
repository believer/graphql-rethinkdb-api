import { r } from '../../db'
import movie from '../../services/movie'
import addToTables from '../../services/addToTables'
import { get, getAll, insert, run, toArray } from '../../utils/helpers'

export default (_, { id, rating, date, userid }) => {
  id = id.match(/tt\d+/)
  rating = parseInt(rating, 10)

  if (!id || !id[0]) {
    throw new Error('No IMDb ID')
  }

  id = id[0]
  
  return toArray(getAll('movies')(id)('imdb'))
    .then(exists => {
      if (!exists.length) {
        return movie(id)
          .then(movieToInsert => insert('movies')(movieToInsert))
          .then(insert => {
            const id = insert.generated_keys[0]

            if (userid) {
              addToTables.user(userid, id)
              addToTables.view(userid, date, id)
            }

            if (rating) {
              addToTables.addRating(userid, rating, id)
            }

            return get('movies')(id)
          })
      } else {
        const existsId = exists[0].id

        if (userid) {
          addToTables.updateUser(userid, existsId)
          addToTables.view(userid, date, existsId)
        }

        if (rating) {
          addToTables.updateRating(userid, rating, existsId)
        }

        const query = getAll('watchlist')(userid)('user')
          .filter(movie => movie('movie').eq(existsId))
          .delete()

        return run(query).then(() => get('movies')(existsId))
      }
    })
}
