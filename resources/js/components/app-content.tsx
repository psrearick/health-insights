import { cn } from '@/lib/utils.ts';
import { ReactNode } from 'react';

export default function AppContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex-1 gap-4 overflow-x-auto p-4', className)}>
      {children}
    </div>
  );
}
