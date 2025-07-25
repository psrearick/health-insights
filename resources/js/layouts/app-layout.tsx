import AppContainer from '@/components/app-container.tsx';
import AppContent from '@/components/app-content.tsx';
import AppSidebar from '@/components/app-sidebar.tsx';
import { SidebarProvider } from '@/components/ui/sidebar.tsx';
import { type ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children, ...props }: AppLayoutProps) {
  return (
    <AppContainer {...props}>
      <SidebarProvider
        sizes={{
          sidebarSpacing: 68,
          collapsedSidebarSpacing: 12,
        }}
      >
        <AppSidebar />
      </SidebarProvider>
      <AppContent>{children}</AppContent>
    </AppContainer>
  );
}
