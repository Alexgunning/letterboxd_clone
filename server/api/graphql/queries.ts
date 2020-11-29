import { schema } from 'nexus';
import { sortBy, reverse } from 'lodash';

schema.queryType({
    definition(t) {
      t.list.field("allMovies", {
        type: "Movie",
        async resolve(_parent, _args, ctx) {
          const allMovies = await ctx.db.movie.findMany();
          let movieRatings = await Promise.all(
            allMovies.map(async movie => {
              const reviews = await ctx.db.review.findMany({where: {movieId: movie.id} })
              const ratings = reviews.map(r => r.rating);
              const sum = ratings.reduce((a,b)=> a+b, 0);
              let rating = sum/reviews.length || 0;
              return {...movie, rating};
            })
          )
          return reverse(sortBy(movieRatings, ['rating']));
        },
      });
      t.crud.movie();
      t.crud.movies({ordering: true, filtering: true});
      t.crud.user();
      t.crud.users();
      t.crud.review();
      t.crud.reviews();
    },
  });