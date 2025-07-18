import Header from '@/components/public/header.tsx';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface PublicLayoutProps {
  title?: string;
}

export default function PublicLayout({
  children,
  title,
}: PropsWithChildren<PublicLayoutProps>) {
  return (
    <>
      <Head title={title || ''} />
      <div className="flex min-h-screen flex-col items-center justify-between bg-background text-foreground">
        <Header />
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </div>
    </>
  );
}
