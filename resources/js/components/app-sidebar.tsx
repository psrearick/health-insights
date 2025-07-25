import Logo from '@/components/logo.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarDivider,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar.tsx';
import { cn } from '@/lib/utils.ts';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

interface AppSidebarProps {
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppSidebar({ breadcrumbs }: AppSidebarProps) {
  const { expanded } = useSidebar();

  return (
    <Sidebar className="transition-[width] duration-200 ease-linear">
      <div className="h-[calc(var(--sidebar-width-collapsed)*2)]">
        <SidebarHeader
          className={cn(
            'flex flex-col items-center justify-between gap-4 p-2 group-has-aria-expanded:flex-row-reverse'
          )}
        >
          <SidebarTrigger />
          <Link href={route('dashboard')} prefetch>
            <Logo
              size="sm"
              textExpanded={expanded}
              hasText={true}
              textWidth="w-[calc(var(--sidebar-width)*0.66)]"
            />
          </Link>
        </SidebarHeader>
      </div>
      <SidebarDivider />
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
  );
}
