'use client';

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from '@liveblocks/react/suspense';

import { LIVEBLOCKS_PUBLIC_API_KEY } from '@/config';

interface RoomProps {
  roomId: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export const Room = ({ roomId, fallback, children }: RoomProps) => {
  return (
    <LiveblocksProvider publicApiKey={LIVEBLOCKS_PUBLIC_API_KEY}>
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};
