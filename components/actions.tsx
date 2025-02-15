'use client';

import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';
import { Link2, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useRenameModal } from '@/store/use-rename-modal';

import { ConfirmModal } from './modals/confirm-modal';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ActionsProps {
  id: Id<'boards'>;
  title: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps['side'];
  sideOffset?: DropdownMenuContentProps['sideOffset'];
}

export const Actions = ({
  id,
  title,
  side,
  sideOffset,
  children,
}: ActionsProps) => {
  const { onOpen } = useRenameModal();

  const { mutate, isPending } = useApiMutation({
    mutationFn: api.board.remove,
  });

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied'))
      .catch(() => toast.error('Failed to copy link'));
  };

  const onDelete = () => {
    mutate({
      id,
    })
      .then(() => {
        toast.success('Board deleted');
      })
      .catch(() => {
        toast.error('Failed to delete board');
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={e => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className='w-60'
      >
        <DropdownMenuItem className='p-3 cursor-pointer' onClick={onCopyLink}>
          <Link2 className='h-4 w-4 mr-2' />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className='p-3 cursor-pointer'
          onClick={() => onOpen({ id, title })}
        >
          <Pencil className='h-4 w-4 mr-2' />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header='Delete board?'
          description='This will delete the board and all of its content.'
          disabled={isPending}
          onConfirm={onDelete}
        >
          <Button
            variant='ghost'
            className='p-3 cursor-pointer text-sm w-full justify-start font-normal'
          >
            <Trash2 className='h-4 w-4 mr-2' />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
