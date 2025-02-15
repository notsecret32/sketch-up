'use client';

import { useQuery } from 'convex/react';

import { api } from '@/convex/_generated/api';

import { BoardCard } from './board-card';
import { EmptyBoards } from './empty-boards';
import { EmptyFavorites } from './empty-favorites';
import { EmptySearch } from './empty-search';
import { NewBoardButton } from './new-board-button';

interface BoardListProps {
  organizationId: string;
  query: {
    search?: string;
    favorites?: boolean;
  };
}

export const BoardList = ({ organizationId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { organizationId: organizationId });

  if (data === undefined) {
    return (
      <div>
        <h2 className='text-3xl font-semibold'>
          {query.favorites ? 'Favorite boards' : 'Team boards'}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
          <NewBoardButton organizationId={organizationId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

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
      <h2 className='text-3xl font-semibold'>
        {query.favorites ? 'Favorite boards' : 'Team boards'}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
        <NewBoardButton organizationId={organizationId} />
        {data.map(board => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            authorName={board.authorName}
            authorId={board.authorId}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            organizationId={board.organizationId}
            isFavorite={false}
          />
        ))}
      </div>
    </div>
  );
};
