import { cn } from '@/lib/utils.ts';
import { ReactNode } from 'react';

interface AppContainerProps {
  children: ReactNode;
  className?: string;
}

export default function AppContainer({
  children,
  className,
  ...props
}: AppContainerProps) {
  return (
    <div className={cn('flex h-svh overflow-y-auto', className)} {...props}>
      {children}
    </div>
  );
}
