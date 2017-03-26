import _ from 'lodash'

export default function sortRatings (stats, ratings) {
  return new Promise(resolve => {
    const result = ratings
      .map(rating => rating.rating)
      .reduce((collection, rating) => {
        collection[rating]++
        return collection
      }, _.range(0, 11, 0))

    resolve(Object.assign({}, stats, { ratings: result }))
  })
}
