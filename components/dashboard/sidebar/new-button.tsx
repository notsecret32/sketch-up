import { CreateOrganization } from '@clerk/nextjs';
import { Plus } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='aspect-square'>
          <Hint label='Create organization'>
            <button className='bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition'>
              <Plus />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className='bg-transparent border-none p-0 shadow-none max-w-[430px]'>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
