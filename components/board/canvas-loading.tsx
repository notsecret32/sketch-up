import { LoaderIcon } from 'lucide-react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

export const CanvasLoading = () => {
  return (
    <div className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
      <LoaderIcon
        className='animate-spin duration-700 text-neutral-400'
        size={48}
      />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </div>
  );
};
