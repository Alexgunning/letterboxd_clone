import { schema } from 'nexus'
import {MovieCreateInput, MovieCreateArgs, MovieArgs} from '@prisma/client'
import { arg } from 'nexus/components/schema'

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

schema.objectType({
    name: 'User',            // <- Name of your type
    definition(t) {
      t.model.id()           // <- Field named `id` of type `Int`
    t.model.email()
    t.model.username()
    },
  }

schema.extendType({
    type: 'Query',
    definition(t) {
        t.field('drafts', {
            type: 'Movie',
            list: true,
            resolve(_root, _args, ctx) {                             // 1
                return ctx.db.movie.findMany({})  // 2
            },
        })
    },
})

schema.mutationType({
    //example
    definition(t) {
      t.field("deleteAllMovies", {
        type: "String",
        async resolve(_parent, _args, ctx) {
          const { count } = await ctx.db.movie.deleteMany({});
          return `${count} user(s) destroyed. Thanos will be proud.`;
        },
      });
  
      t.crud.createOneMovie();
      t.crud.deleteOneMovie();
      t.crud.deleteManyMovie();
      t.crud.updateOneMovie();
      t.crud.updateManyMovie();
    },
  });

schema.queryType({
    definition(t) {
      t.list.field("allMovies", {
        type: "Movie",
        resolve(_parent, _args, ctx) {
          return ctx.db.movie.findMany({});
        },
      });
      t.crud.movie();
      t.crud.movies();
    },
  });

schema.extendType({
    type: 'Mutation',
    definition(t) {
        t.field('createMovie', {
            type: 'Movie',
            args: MovieArgs,                                        // 1
            // args: {title: "String"},                                        // 1
            nullable: false,
            resolve(_root, args, ctx) {
                console.log(ctx.db);
                const draft = {
                    id: 1,
                    title: args.title,                         // 3
                    body: args.body,                           // 3
                    published: false,
                }
                ctx.db.movie.create(args)
                //   ctx.db.posts.push(draft)
                return draft
            },
        })
    },
})


// schema.extendType({
//     type: 'Query',
//     definition(t) {
//       // ...
//       t.list.field('posts', {
//         type: 'Post',
//         resolve(_root, _args, ctx) {
//           return ctx.db.posts.filter(p => p.published === true)
//         },
//       })
//     },
//   })

// schema.extendType({
//     type: 'Mutation',
//     definition(t) {
//       // ...
//       t.field('publish', {
//         type: 'Post',
//         args: {
//           draftId: schema.intArg({ required: true }),
//         },
//         resolve(_root, args, ctx) {
//           let draftToPublish = ctx.db.posts.find(p => p.id === args.draftId)
//           if (!draftToPublish) {
//             throw new Error('Could not find draft with id ' + args.draftId)
//           }
//           draftToPublish.published = true
//           return draftToPublish
//         },
//       })
//     },
//   })