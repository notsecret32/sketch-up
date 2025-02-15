'use client';

import { useAuth } from '@clerk/nextjs';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { Actions } from '@/components/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useApiMutation } from '@/hooks/use-api-mutation';

import { Footer } from './footer';
import { Overlay } from './overlay';

interface BoardCardProps {
  id: Id<'boards'>;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  organizationId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorName,
  authorId,
  createdAt,
  imageUrl,
  organizationId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const { mutate: favorite, isPending: isFavoritePending } = useApiMutation({
    mutationFn: api.board.favorite,
  });

  const { mutate: unfavorite, isPending: isUnfavoritePending } = useApiMutation(
    {
      mutationFn: api.board.unfavorite,
    }
  );

  const authorLabel = userId === authorId ? 'You' : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const toggleFavorite = () => {
    if (isFavorite) {
      unfavorite({ id }).catch(() => {
        toast.error('Failed to unfavorite board');
      });
    } else {
      favorite({ id, organizationId }).catch(() => {
        toast.error('Failed to favorite board');
      });
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
        <div className='relative flex-1 bg-amber-50'>
          <Image src={imageUrl} alt={title} fill className='object-fit' />
          <Overlay />
          <Actions id={id} title={title} side='right'>
            <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
              <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
            </button>
          </Actions>
        </div>
        <Footer
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavorite={isFavorite}
          disabled={isFavoritePending || isUnfavoritePending}
          onFavorite={toggleFavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className='aspect-[100/127] rounded-lg overflow-hidden'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
