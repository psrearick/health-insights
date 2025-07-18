import { AppContent } from '@/components-bak/app-content';
import { AppHeader } from '@/components-bak/app-header';
import { AppShell } from '@/components-bak/app-shell';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function AppHeaderLayout({
                                            children,
                                            breadcrumbs
                                        }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell>
            <AppHeader breadcrumbs={breadcrumbs} />
            <AppContent>{children}</AppContent>
        </AppShell>
    );
}
