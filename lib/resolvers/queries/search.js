import { r } from '../../db'

export default (_, { title, actor, director }) => {
  return r
    .table('movies')
    .filter(doc => {
      if (title && !actor && !director) {
        return doc('title').match(title)
      }

      if (title && actor && !director) {
        return doc('cast')
          .contains(row => row.match(actor))
          .and(doc('title').match(title))
      }

      if (!title && actor) {
        return doc('cast').contains(actor)
      }

      if (title && actor && !director) {
        return doc('cast')
          .contains(row => row.match(actor))
          .and(doc('title').match(title))
      }

      if (title && !actor && director) {
        return doc('title')
          .match(title)
          .and(doc('director').contains(row => row.match(director)))
      }

      if (title && actor && director) {
        return doc('cast')
          .contains(row => row.match(actor))
          .and(doc('title').match(title))
          .and(doc('director').contains(row => row.match(director)))
      }

      return true
    })
    .run(r.conn)
    .then(cursor => cursor.toArray())
}
