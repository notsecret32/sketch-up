import { TooltipContentProps } from '@radix-ui/react-tooltip';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: TooltipContentProps['side'];
  sideOffset?: TooltipContentProps['sideOffset'];
  align?: TooltipContentProps['align'];
  alignOffset?: TooltipContentProps['alignOffset'];
}

export const Hint = ({
  label,
  side = 'right',
  sideOffset = 10,
  align = 'start',
  alignOffset,
  children,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className='text-white bg-neutral-700 border-none'
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
        >
          <p className='font-semibold capitalize'>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
