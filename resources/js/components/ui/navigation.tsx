import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';
import { UrlOptions } from '@/types';
import { resolveUrl, useIsCurrentRoute } from '@/lib/url.ts';
import { Link } from '@inertiajs/react';

function NavigationMenu({
                            className,
                            children,
                            ...props
                        }: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
    return (
        <NavigationMenuPrimitive.Root
            className={cn(
                'flex items-center gap-4',
                className
            )}
            {...props}
        >
            {children}
        </NavigationMenuPrimitive.Root>
    );
}

function NavigationMenuList({
                                className,
                                ...props
                            }: ComponentProps<typeof NavigationMenuPrimitive.List>) {
    return (
        <NavigationMenuPrimitive.List
            data-slot="navigation-menu-list"
            className={cn(
                'my-4 group flex flex-1 list-none items-center justify-center gap-6',
                className
            )}
            {...props}
        />
    );
}

function NavigationMenuItem({
                                className,
                                ...props
                            }: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
    return (
        <NavigationMenuPrimitive.Item
            data-slot="navigation-menu-item"
            className={cn('relative', className)}
            {...props}
        />
    );
}

interface NavigationMenuLinkProps extends ComponentProps<typeof NavigationMenuPrimitive.Link> {
    to: UrlOptions | string,
    isActive?: boolean;
    children?: ReactNode;
    className?: string;
}

function NavigationMenuLink(
    {
        className,
        children,
        to,
        isActive,
        ...props
    }: NavigationMenuLinkProps) {
    const href = resolveUrl(to);
    const isActiveUrl = useIsCurrentRoute(to, { exact: false });

    const active = isActive || isActiveUrl;

    return (
        <NavigationMenuPrimitive.Link asChild active={active}  {...props}>
            <Link href={href} className={className}>
                {children}
            </Link>
        </NavigationMenuPrimitive.Link>
    );
}


export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink
};
