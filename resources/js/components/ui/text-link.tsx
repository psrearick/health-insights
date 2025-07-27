import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof Link>;

export default function TextLink({
                                     className = '',
                                     children,
                                     ...props
                                 }: LinkProps) {
    return (
        <Link
            className={cn(
                'outline-0 text-gray-8 hover:text-current focus:text-current underline underline-offset-4 transition duration-300 ease-out decoration-gray-8 focus:decoration-current! hover:decoration-current!',
                className
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
