import { v } from 'convex/values';

import { mutation } from './_generated/server';

export const create = mutation({
  args: {
    organizationId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await ctx.db.insert('boards', {
      title: args.title,
      organizationId: args.organizationId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: '/placeholders/board.svg',
    });

    return board;
  },
});

export const update = mutation({
  args: {
    id: v.id('boards'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error('Title is required');
    }

    if (title.length > 60) {
      throw new Error('Title cannot be larger than 60 characters');
    }

    await ctx.db.patch(args.id, { title });
  },
});

export const remove = mutation({
  args: {
    id: v.id('boards'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query('favorites')
      .withIndex('by_user_board', query =>
        query.eq('userId', userId).eq('boardId', args.id)
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const favorite = mutation({
  args: {
    id: v.id('boards'),
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error('Board not found');
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query('favorites')
      .withIndex('by_user_board', query =>
        query.eq('userId', userId).eq('boardId', board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error('Board already favorite');
    }

    await ctx.db.insert('favorites', {
      userId,
      boardId: board._id,
      organizationId: args.organizationId,
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: {
    id: v.id('boards'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error('Board not found');
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query('favorites')
      .withIndex('by_user_board', query =>
        query.eq('userId', userId).eq('boardId', board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error('Favorite board not found');
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
