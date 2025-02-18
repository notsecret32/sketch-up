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
import { Skeleton } from '../ui/skeleton';
import { ToolButton } from './tool-button';

export const Toolbar = () => {
  return (
    <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
      <div className='bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md'>
        <ToolButton label='Select' icon={MousePointer2} />
        <ToolButton label='Text' icon={Type} />
        <ToolButton label='Sticky note' icon={StickyNote} />
        <ToolButton label='Rectangle' icon={Square} />
        <ToolButton label='Ellipse' icon={Circle} />
        <ToolButton label='Pen' icon={Pencil} />
      </div>
      <div className='bg-white rounded-md p-1.5 flex flex-col gap-y-1 items-center shadow-md'>
        <ToolButton label='Undo' icon={Undo2} isDisabled={true} />
        <ToolButton label='Redo' icon={Redo2} isDisabled={true} />
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
