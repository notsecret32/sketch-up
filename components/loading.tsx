import { LoaderIcon } from 'lucide-react';

export const Loading = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center'>
      <LoaderIcon
        className='animate-spin duration-700 text-neutral-400'
        size={48}
      />
    </div>
  );
};
