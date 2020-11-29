import { schema } from 'nexus'
import { resolve } from 'path'

schema.objectType({
  name: 'Movie',            // <- Name of your type
  definition(t) {
    t.model.id()           // <- Field named `id` of type `Int`
    t.model.title()
    t.model.genre()
    t.model.year()
    t.model.createdAt()
    t.model.Reviews()
    t.float('rating', {
      async resolve(_parent, _args, ctx) {
        const reviews = await ctx.db.review.findMany({where: {movieId: _parent.id} })
        const ratings = reviews.map(r => r.rating);
        const sum = ratings.reduce((a,b)=> a+b, 0);
        return sum/reviews.length || 0;
      }
    })
  }
})