import { schema } from 'nexus'

schema.objectType({
  name: 'User',            // <- Name of your type
  definition(t) {
    t.model.id()           // <- Field named `id` of type `Int`
    t.model.username()
    t.model.email(),
    t.model.Review()
  },
})

