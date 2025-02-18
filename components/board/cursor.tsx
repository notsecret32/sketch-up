'use client';

import { useOther } from '@liveblocks/react';
import { MousePointer2 } from 'lucide-react';
import { memo } from 'react';

import { connectionIdToColor } from '@/lib/utils';

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const { name } = useOther(connectionId, user => user.info);
  const cursor = useOther(connectionId, user => user.presence.cursor);

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width={name.length * 10 + 24}
      height={50}
      className='relative drop-shadow-md'
    >
      <MousePointer2
        className='h-5 w-5'
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className='absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold select-none'
        style={{
          backgroundColor: connectionIdToColor(connectionId),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});
Cursor.displayName = 'Cursor';
