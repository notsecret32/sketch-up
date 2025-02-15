'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { useRenameModal } from '@/store/use-rename-modal';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';

export const RenameModal = () => {
  const { mutate, isPending } = useApiMutation({
    mutationFn: api.board.update,
  });

  const { isOpen, onClose, initialValues } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!initialValues.id) return;

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success('Board renamed');
        onClose();
      })
      .catch(() => {
        toast.error('Failed to rename board');
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
          <DialogDescription>
            Enter a new title for this board
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className='space-y-4'>
          <Input
            disabled={isPending}
            required
            maxLength={60}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder='Board title'
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} type='submit'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
