'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';

interface RoomProps {
  roomId: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export const Room = ({ roomId, fallback, children }: RoomProps) => {
  return (
    <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
};
