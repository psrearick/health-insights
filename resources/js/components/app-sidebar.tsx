import Logo from '@/components/logo.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

interface AppSidebarProps {
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppSidebar({ breadcrumbs }: AppSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex flex-row-reverse items-center justify-between p-2">
          <SidebarTrigger />
          <Link href={route('dashboard')} prefetch>
            <Logo size="sm" />
          </Link>
        </SidebarHeader>
        <SidebarContent>
          Content
          {breadcrumbs?.map((item, i) => (
            <div key={`${item}.${i}`}>
              {i}: {item.title}
            </div>
          ))}
        </SidebarContent>
        <SidebarFooter>User Management</SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
