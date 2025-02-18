import { LucideIcon } from 'lucide-react';
import { Hint } from '../hint';
import { Button } from '../ui/button';

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side='right' sideOffset={14}>
      <Button
        onClick={onClick}
        disabled={isDisabled}
        size='icon'
        variant={isActive ? 'boardActive' : 'board'}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
