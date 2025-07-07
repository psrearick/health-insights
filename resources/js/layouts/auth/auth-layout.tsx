import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  name?: string;
  title?: string;
  description?: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-between">
      <div className="flex w-full flex-row-reverse py-6 pr-6">
        <Link
          href={route('home')}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
          <X className="hover:text-primary" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4">
              <Link
                href={route('home')}
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                  <AppLogoIcon className="size-9 fill-primary text-primary" />
                </div>
                <span className="sr-only">{title}</span>
              </Link>

              <div className="space-y-2 text-center">
                <h1 className="text-xl font-medium">{title}</h1>
                <p className="text-center text-sm text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      <div className="h-20 w-full" />
    </div>
  );
}
