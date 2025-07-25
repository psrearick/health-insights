import AppSidebarHeader from '@/components/app-sidebar-header.tsx';
import AppSidebarFooter from '@/components/app-siderbar-footer.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarDivider,
} from '@/components/ui/sidebar.tsx';
import { BreadcrumbItem } from '@/types';

interface AppSidebarProps {
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppSidebar({ breadcrumbs }: AppSidebarProps) {
  return (
    <Sidebar className="group/side transition-[width] duration-300 ease-linear">
      <AppSidebarHeader />
      <SidebarDivider />
      <SidebarContent>
        Content
        {breadcrumbs?.map((item, i) => (
          <div key={`${item}.${i}`}>
            {i}: {item.title}
          </div>
        ))}
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
