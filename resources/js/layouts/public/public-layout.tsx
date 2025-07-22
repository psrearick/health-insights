import Header from '@/components/public/header.tsx';
import { PropsWithChildren } from 'react';

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
      <Header />
      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
}
