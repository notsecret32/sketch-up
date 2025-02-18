import { LoaderIcon } from 'lucide-react';

import { InfoSkeleton } from './info';
import { ParticipantsSkeleton } from './participants';
import { ToolbarSkeleton } from './toolbar';

export const CanvasLoading = () => {
  return (
    <div className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <LoaderIcon
        className='animate-spin duration-700 text-neutral-400'
        size={48}
      />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </div>
  );
};
