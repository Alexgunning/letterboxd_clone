import { schema } from 'nexus'

schema.objectType({
  name: 'Movie',            // <- Name of your type
  definition(t) {
    t.model.id()           // <- Field named `id` of type `Int`
    t.model.title()
    t.model.genre()
    t.model.year()
    t.model.createdAt()
  },
})