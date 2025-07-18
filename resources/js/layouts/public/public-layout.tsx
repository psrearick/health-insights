import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/components/public/header.tsx';

interface PublicLayoutProps {
    title?: string;
}

export default function PublicLayout({
                                         children,
                                         title
                                     }: PropsWithChildren<PublicLayoutProps>) {
    return (
        <>
            <Head title={title || ''} />
            <div
                className="flex min-h-screen flex-col items-center bg-background text-foreground justify-between"
            >
                <Header />
                <div className="flex-1 w-full flex flex-col">
                    {children}
                </div>
            </div>
        </>
    );
}
