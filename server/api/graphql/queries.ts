import { schema } from 'nexus';
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
      t.crud.user();
      t.crud.users();
      t.crud.review();
      t.crud.reviews();
    },
  });