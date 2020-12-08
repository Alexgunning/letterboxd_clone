import { schema } from 'nexus';
import {intArg, stringArg} from '@nexus/schema';

schema.extendType({
    type: 'Mutation',
    //example
    definition(t) {
      t.field("createReview", {
        type: "Review",
        args: {
          text: stringArg({required: true}),
          rating: intArg({required: true}),
          movieId: intArg({required: true}),
          userId: intArg({required: true})
        },
        async resolve(_parent, _args, ctx) {
          let review = await ctx.db.review.create({
            data: {
              text: _args.text, rating: _args.rating, Movie: {
                connect: { id: _args.movieId },
              },
              User: {
                connect: { id: _args.userId },
              },
            }
          });
          return review;
        },
      });

      t.field("createMovie", {
        type: "Movie",
        args: {
          title: stringArg({required: true}),
          year: intArg({required: true}),
          genre: stringArg({required: true}),
          summary: stringArg({required: true}),
          image_url: stringArg({required: true})
        },
        async resolve(_parent, _args, ctx) {
          let url = _args.title.toLocaleLowerCase().replace(/ /g, '_')+'_'+_args.year.toString();
          let movie = await ctx.db.movie.create({
            data: {
              title: _args.title, year: _args.year, genre: _args.genre, url: url, summary: _args.summary, image_url: _args.image_url
                         }
          });
          return movie;
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
    t.crud.deleteOneReview();
    t.crud.deleteManyReview();
    t.crud.updateOneReview();
    t.crud.updateManyReview();
    t.crud.createOneReview();
  },
});