import { schema } from 'nexus';
import {intArg, stringArg} from '@nexus/schema';

schema.mutationType({
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