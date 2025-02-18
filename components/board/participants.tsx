'use client';

import { useOthers, useSelf } from '@liveblocks/react';

import { connectionIdToColor } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';
import { UserAvatar } from './user-avatar';

// Ignores the current user
const MAX_SHOWN_OTHER_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_OTHER_USERS;

  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      <div className='flex gap-x-2'>
        {currentUser && (
          <UserAvatar
            src={currentUser.info.picture}
            name={`${currentUser.info.name} (You)`}
            fallback={currentUser.info.name[0] || 'A'}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}

        {users.slice(0, MAX_SHOWN_OTHER_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info.picture}
              name={info.name}
              fallback={info.name[0] || 'A'}
              borderColor={connectionIdToColor(connectionId)}
            />
          );
        })}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_OTHER_USERS} more...`}
            fallback={`+${users.length - MAX_SHOWN_OTHER_USERS}`}
          />
        )}
      </div>
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
