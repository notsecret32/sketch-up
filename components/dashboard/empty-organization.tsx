import { CreateOrganization } from '@clerk/nextjs';
import Image from 'next/image';

import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

export const EmptyOrganization = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Image
        src='/empty-organization.svg'
        alt='Empty organization'
        width={140}
        height={140}
      />
      <h2 className='text-2xl font-semibold mt-6'>Welcome to SketchUp</h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Create an organization to get started
      </p>
      <div className='mt-6'>
        <Dialog>
          <DialogTrigger asChild>
            <Button size='lg'>Create organization</Button>
          </DialogTrigger>
          <DialogContent className='p-0 bg-transparent border-none max-w-[430px]'>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
