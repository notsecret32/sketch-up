'use client';

import { useQuery } from 'convex/react';
import { Menu } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useRenameModal } from '@/store/use-rename-modal';

import { Actions } from '../actions';
import { Hint } from '../hint';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface InfoProps {
  boardId: string;
}

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.board.get, { id: boardId as Id<'boards'> });

  if (!data) return <InfoSkeleton />;

  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      <Hint label='Go to boards' align='center' side='bottom'>
        <Button variant='board' className='px-2' asChild>
          <Link href='/'>
            <Image src='/logo.svg' alt='Logo' width={30} height={30} />
            <span
              className={cn(
                'font-semibold text-xl ml-2 text-black',
                poppins.className
              )}
            >
              SketchUp
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label='Edit title' align='center' side='bottom'>
        <Button
          variant='board'
          className='block text-base font-normal px-2 max-w-[320px] overflow-hidden whitespace-nowrap text-ellipsis'
          onClick={() => onOpen({ id: data._id, title: data.title })}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title}>
        <div>
          <Hint label='Actions' align='center' side='bottom'>
            <Button variant='board' size='icon'>
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md h-12 flex items-center shadow-md w-[300px]'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};

const TabSeparator = () => {
  return <div className='text-neutral-300 px-1.5'>|</div>;
};
