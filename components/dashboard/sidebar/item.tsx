'use client';

import { Hint } from '@/components/hint';
import { cn } from '@/lib/utils';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import Image from 'next/image';

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return null;
    setActive({ organization: id });
  };

  return (
    <div className='aspect-square relative'>
      <Hint label={name}>
        <Image
          fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            'rounded-md cursor-pointer opacity-75 hover:opacity-100 transition',
            isActive && 'opacity-100'
          )}
        />
      </Hint>
    </div>
  );
};
