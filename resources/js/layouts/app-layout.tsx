import AppContainer from '@/components/app-container.tsx';
import AppContent from '@/components/app-content.tsx';
import AppSidebar from '@/components/app-sidebar.tsx';
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
      <AppSidebar breadcrumbs={breadcrumbs} />
      <AppContent>{children}</AppContent>
    </AppContainer>
  );
}
