import { ReactNode } from 'react';
import PublicLayoutTemplate from '@/layouts/public/public-layout.tsx';

interface PublicLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function PublicLayout({ children, title, ...props }: PublicLayoutProps) {
    return (
        <PublicLayoutTemplate title={title} {...props}>
            {children}
        </PublicLayoutTemplate>
    );
}
