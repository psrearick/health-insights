import AppLogoIcon from '@/components/app-logo-icon';
import { X } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-svh flex flex-col items-center justify-between">
            <div className="w-full py-6 pr-6 flex flex-row-reverse">
                <Link href={route('home')} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                    <X className='hover:text-primary' />
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                    <AppLogoIcon className="size-9 text-primary fill-primary" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-center text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <div className='w-full h-20' />
        </div>
    );
}
