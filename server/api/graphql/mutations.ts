import { schema } from 'nexus';

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
      t.crud.createOneUser();
      t.crud.deleteOneUser();
      t.crud.deleteManyUser();
      t.crud.updateOneUser();
      t.crud.updateManyUser();
      t.crud.createOneReview();
      t.crud.deleteOneReview();
      t.crud.deleteManyReview();
      t.crud.updateOneReview();
      t.crud.updateManyReview()
    },
  });