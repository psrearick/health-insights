import PublicLayoutTemplate from '@/layouts/public/public-layout.tsx';
import { ReactNode } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
  ...props
}: PublicLayoutProps) {
  return <PublicLayoutTemplate {...props}>{children}</PublicLayoutTemplate>;
}
