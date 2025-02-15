'use client';

import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { cn } from '@/lib/utils';

interface NewBoardButtonProps {
  organizationId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({
  organizationId,
  disabled,
}: NewBoardButtonProps) => {
  const { mutate, isPending } = useApiMutation({
    mutationFn: api.board.create,
  });

  const onClick = () => {
    mutate({
      organizationId,
      title: 'Untitled',
    })
      .then(() => {
        toast.success('Board created');
        // TODO: Redirect to /board/:id
      })
      .catch(() => {
        toast.error('Failed to create board');
      });
  };

  return (
    <button
      disabled={isPending || disabled}
      onClick={onClick}
      className={cn(
        'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
        (isPending || disabled) && 'opacity-75 hover:bg-blue-600'
      )}
    >
      <div />
      <Plus className='h-12 w-12 text-white stroke-1' />
      <p className='text-sm text-white font-light'>New board</p>
    </button>
  );
};
