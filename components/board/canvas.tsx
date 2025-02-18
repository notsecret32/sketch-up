'use client';

import { CanvasState } from '@/types/canvas';
import { useCanRedo, useCanUndo, useHistory } from '@liveblocks/react';
import { useState } from 'react';
import { Info } from './info';
import { Participants } from './participants';
import { Toolbar } from './toolbar';

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: 'none',
  });

  return (
    <div className='h-full w-full relative bg-neutral-100 touch-none'>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
    </div>
  );
};
