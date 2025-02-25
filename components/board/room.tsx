'use client';

import { LiveList, LiveMap, LiveObject } from '@liveblocks/client';
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';

import { Layer } from '@/types/canvas';

interface RoomProps {
  roomId: string;
  fallback: React.ReactNode;
  children: React.ReactNode;
}

export const Room = ({ roomId, fallback, children }: RoomProps) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [] }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList([]),
      }}
    >
      <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
    </RoomProvider>
  );
};
