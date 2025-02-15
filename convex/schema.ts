import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  boards: defineTable({
    title: v.string(),
    organizationId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index('by_organization', ['organizationId'])
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['organizationId'],
    }),
});
