const crews = {
  Director: () => 'director',
  Writing: () => 'writer',
  Screenplay: () => 'writer',
  Writer: () => 'writer',
  Music: () => 'music',
  'Original Music Composer': () => 'music'
}

/**
 * Collect the crew members of a movie
 * @param  {string} job - Type of job
 * @return {[type]} [description]
 */
function getCrew (job) {
  const crew = crews[job]
  return crew ? crew() : null
}

export default function (data) {
  const crew = {
    director: [],
    writer: [],
    music: []
  }

  data.forEach(person => {
    var crewType = getCrew(person.job)
    if (crewType) { crew[crewType].push(person.name) }
  })

  return crew
}
