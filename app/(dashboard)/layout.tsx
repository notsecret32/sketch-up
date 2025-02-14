import { Navbar } from '@/components/dashboard/navbar';
import { OrganizationSidebar } from '@/components/dashboard/organization-sidebar';
import { Sidebar } from '@/components/dashboard/sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className='h-full'>
      <Sidebar />
      <div className='pl-[60px] h-full'>
        <div className='flex gap-x-3 h-full'>
          <OrganizationSidebar />
          <div className='h-full flex-1'>
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
