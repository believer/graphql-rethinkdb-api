var _ = require('lodash')

function sortNames (names, max) {
  max = max || 10
  var sortedNames = []

  names.forEach((movies, name) => {
    sortedNames.push({ name: name, movies: movies })
  })

  sortedNames = sortedNames
    .sort((a,b) => b.movies - a.movies)
    .slice(0, max)

  return sortedNames
}

function addToMap (values, map) {
  values = values || []
  values.forEach(value => {
    var amount = map.has(value) ? map.get(value) + 1 : 1
    map.set(value, amount)
  })

  return map
}

function stats (movies) {
  return new Promise(resolve => {
    var stats = {
      time: {
        minutes: 0,
        adjustedMinutes: 0
      },
      years: {},
      wilhelms: 0
    }

    var actors = new Map()
    var directors = new Map()
    var composers = new Map()
    var genres = new Map()
    var languages = new Map()
    var productionCompanies = new Map()
    var years = new Map()
    var rewatches = new Map()

    stats.total = movies.length

    movies.forEach(movie => {
      if (movie.year !== 0) {
        if (!years.has(movie.year)) {
          years.set(movie.year, 1)
        } else {
          years.set(movie.year, years.get(movie.year) + 1)
        }
      }

      // Crew
      actors = addToMap(movie.cast, actors)
      directors = addToMap(movie.director, directors)
      composers = addToMap(movie.music, composers)
      genres = addToMap(movie.genres, genres)

      var runtime

      if (movie.languages) {
        languages = addToMap(movie.languages, languages)
      }

      if (movie.production_companies) {
        productionCompanies = addToMap(movie.production_companies, productionCompanies)
      }

      // Total minutes
      if (movie.runtime) {
        runtime = parseInt(movie.runtime, 10)
        stats.time.minutes += runtime
      }

      // Adjusted runtime for rewatches and rewatched movies
      if (movie.dates && movie.dates.length > 1) {
        var adjustedMinutes = runtime * movie.dates.length - 1
        stats.time.adjustedMinutes += parseInt(adjustedMinutes, 10)

        rewatches.set(movie.title, movie.dates.length)
      }

      // Wilhelm screams
      stats.wilhelms += movie.wilhelm ? 1 : 0
    })

    // Calculate some more times from the total minutes
    stats.time.adjustedMinutes = stats.time.adjustedMinutes + stats.time.minutes
    stats.time.hours = Math.floor(stats.time.minutes / 60)
    stats.time.days  = Math.floor(stats.time.hours / 24)
    stats.time.years = (stats.time.days / 365).toFixed(2) / 1

    // Totals
    stats.numbers = {
      actors: actors.size,
      directors: directors.size,
      composers: composers.size,
      genres: genres.size,
      productionCompanies: productionCompanies.size,
      languages: languages.size
    }

    // Prettify values for browser
    years.forEach((movies, year) => {
      stats.years[year] = movies
    })

    stats.years = _.omit(stats.years, 'undefined')

    stats.actors = sortNames(actors)
    stats.directors = sortNames(directors)
    stats.composers = sortNames(composers)
    stats.genres = sortNames(genres)
    stats.productionCompanies = sortNames(productionCompanies)
    stats.languages = sortNames(languages)
    stats.rewatches = sortNames(rewatches)

    resolve(stats)
  })
}

module.exports = stats
