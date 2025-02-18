import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from 'lucide-react';

import { CanvasState } from '@/types/canvas';

import { Skeleton } from '../ui/skeleton';
import { ToolButton } from './tool-button';

interface ToolbarState {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
}: ToolbarState) => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md'>
        <ToolButton
          label='Select'
          icon={MousePointer2}
          onClick={() =>
            setCanvasState({
              mode: 'none',
            })
          }
          isActive={
            canvasState.mode === 'none' ||
            canvasState.mode === 'translating' ||
            canvasState.mode === 'selection' ||
            canvasState.mode === 'pressing' ||
            canvasState.mode === 'resizing'
          }
        />
        <ToolButton
          label='Text'
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: 'inserting',
              layerType: 'text',
            })
          }
          isActive={
            canvasState.mode === 'inserting' && canvasState.layerType === 'text'
          }
        />
        <ToolButton
          label='Sticky note'
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: 'inserting',
              layerType: 'note',
            })
          }
          isActive={
            canvasState.mode === 'inserting' && canvasState.layerType === 'note'
          }
        />
        <ToolButton
          label='Rectangle'
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: 'inserting',
              layerType: 'rectangle',
            })
          }
          isActive={
            canvasState.mode === 'inserting' &&
            canvasState.layerType === 'rectangle'
          }
        />
        <ToolButton
          label='Ellipse'
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: 'inserting',
              layerType: 'ellipse',
            })
          }
          isActive={
            canvasState.mode === 'inserting' &&
            canvasState.layerType === 'ellipse'
          }
        />
        <ToolButton
          label='Pen'
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: 'pencil',
            })
          }
          isActive={canvasState.mode === 'pencil'}
        />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md'>
        <ToolButton
          label='Undo'
          icon={Undo2}
          isDisabled={!canUndo}
          onClick={undo}
        />
        <ToolButton
          label='Redo'
          icon={Redo2}
          isDisabled={!canRedo}
          onClick={redo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md'>
      <Skeleton className='h-full w-full' />
    </div>
  );
};
