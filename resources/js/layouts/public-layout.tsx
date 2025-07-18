import PublicLayoutTemplate from '@/layouts/public/public-layout.tsx';
import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
  title?: string;
}

export default function PublicLayout({
  children,
  title,
  ...props
}: PublicLayoutProps) {
  return (
    <PublicLayoutTemplate title={title} {...props}>
      {children}
    </PublicLayoutTemplate>
  );
}
