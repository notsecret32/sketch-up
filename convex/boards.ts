import { v } from 'convex/values';

import { query } from './_generated/server';

export const get = query({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Unauthorized');
    }

    const boards = await ctx.db
      .query('boards')
      .withIndex('by_organization', query =>
        query.eq('organizationId', args.organizationId)
      )
      .order('desc')
      .collect();

    return boards;
  },
});
