import { Hint } from '../hint';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
}: UserAvatarProps) => {
  return (
    <Hint label={name || 'Anonymous'} side='bottom' sideOffset={18}>
      <Avatar
        className='h-8 w-8 border-2 select-none cursor-default'
        style={{
          borderColor,
        }}
      >
        <AvatarImage src={src} />
        <AvatarFallback className='text-xs font-semibold'>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
