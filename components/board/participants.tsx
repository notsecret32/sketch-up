import { Skeleton } from '../ui/skeleton';

export const Participants = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      List of users
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md flex items-center shadow-md w-[100px]'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
