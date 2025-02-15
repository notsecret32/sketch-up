'use client';

import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';

import { Button } from '../ui/button';

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, isPending } = useApiMutation({
    mutationFn: api.board.create,
  });

  const onClick = () => {
    if (!organization) return null;

    mutate({
      title: 'Untitled',
      organizationId: organization.id,
    })
      .then(() => {
        toast.success('Board created');
        // TODO: redirect to boards/:id
      })
      .catch(() => toast.error('Failed to create board'));
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <Image
        src='/empty-boards.svg'
        alt='Empty boards'
        width={140}
        height={140}
      />
      <h2 className='text-2xl font-semibold mt-6'>Create your first board!</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
      <div className='mt-6'>
        <Button disabled={isPending} size='lg' onClick={onClick}>
          Create board
        </Button>
      </div>
    </div>
  );
};
