import AppContainer from '@/components/app-container.tsx';
import AppContent from '@/components/app-content.tsx';
import AppSidebar from '@/components/app-sidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({
  children,
  breadcrumbs,
  ...props
}: AppLayoutProps) {
  return (
    <AppContainer {...props}>
      <SidebarProvider
        sizes={{
          sidebarWidth: '17rem',
          collapsedSidebarWidth: '3rem',
        }}
      >
        <AppSidebar breadcrumbs={breadcrumbs} />
      </SidebarProvider>
      <AppContent>{children}</AppContent>
    </AppContainer>
  );
}
