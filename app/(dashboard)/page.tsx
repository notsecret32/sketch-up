'use client';

import { useOrganization } from '@clerk/nextjs';

import { BoardList } from '@/components/dashboard/board-list';
import { EmptyOrganization } from '@/components/dashboard/empty-organization';

interface DashboardPageProps {
  searchParams: {
    search: string;
    favorites: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization();

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {!organization ? (
        <EmptyOrganization />
      ) : (
        <BoardList organizationId={organization.id} query={searchParams} />
      )}
    </div>
  );
}
