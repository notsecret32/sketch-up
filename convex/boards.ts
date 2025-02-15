import { getAllOrThrow } from 'convex-helpers/server/relationships';
import { v } from 'convex/values';

import { query } from './_generated/server';

export const get = query({
  args: {
    organizationId: v.string(),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query('favorites')
        .withIndex('by_user_organization', query =>
          query
            .eq('userId', identity.subject)
            .eq('organizationId', args.organizationId)
        )
        .order('desc')
        .collect();

      const ids = favoriteBoards.map(favorite => favorite.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map(board => ({ ...board, isFavorite: true }));
    }

    const boards = await ctx.db
      .query('boards')
      .withIndex('by_organization', query =>
        query.eq('organizationId', args.organizationId)
      )
      .order('desc')
      .collect();

    const boardsWithFavoriteRelation = boards.map(board => {
      return ctx.db
        .query('favorites')
        .withIndex('by_user_board', query =>
          query.eq('userId', identity.subject).eq('boardId', board._id)
        )
        .unique()
        .then(favorite => {
          return {
            ...board,
            isFavorite: !!favorite,
          };
        });
    });

    const boardsWithFavorite = Promise.all(boardsWithFavoriteRelation);

    return boardsWithFavorite;
  },
});
