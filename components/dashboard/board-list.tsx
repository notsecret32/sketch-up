'use client';

import { EmptyBoards } from './empty-boards';
import { EmptyFavorites } from './empty-favorites';
import { EmptySearch } from './empty-search';

interface BoardListProps {
  organizationId: string;
  query: {
    search?: string;
    favorites?: boolean;
  };
}

export const BoardList = ({ organizationId, query }: BoardListProps) => {
  const data = [];

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      {organizationId} | {JSON.stringify(query)}
    </div>
  );
};
