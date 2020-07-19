import { schema } from 'nexus'

schema.objectType({
  name: 'Review',            // <- Name of your type
  definition(t) {
    t.model.id()           // <- Field named `id` of type `Int`
    t.model.rating()
    t.model.text()
    t.model.movieId()
    t.model.userId()
  },
})