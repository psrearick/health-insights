import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';
import { UrlOptions } from '@/types';
import { resolveUrl, useIsCurrentRoute } from '@/lib/url.ts';
import { Link } from '@inertiajs/react';
import { Method } from '@inertiajs/core';

const {
    Trigger,
    Sub,
    Indicator,
    Content,
    Viewport
} = NavigationMenuPrimitive;

function NavigationMenu({
                            className,
                            children,
                            ref,
                            ...props
                        }: ComponentProps<typeof NavigationMenuPrimitive.Root>) {
    return (
        <NavigationMenuPrimitive.Root
            ref={ref}
            className={cn(
                'flex items-center gap-4 w-full my-0 mx-auto max-w-xs lg:max-w-4xl justify-between',
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
                                ref,
                                ...props
                            }: ComponentProps<typeof NavigationMenuPrimitive.List>) {
    return (
        <NavigationMenuPrimitive.List
            ref={ref}
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
                                ref,
                                ...props
                            }: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
    return (
        <NavigationMenuPrimitive.Item
            data-slot="navigation-menu-item"
            ref={ref}
            className={className}
            {...props}
        />
    );
}

interface NavigationMenuLinkProps extends ComponentProps<typeof NavigationMenuPrimitive.Link> {
    to: UrlOptions | string,
    isActive?: boolean;
    children?: ReactNode;
    indicator?: boolean;
    className?: string;
    method?: Method;
}

function NavigationMenuLink(
    {
        className,
        children,
        to,
        isActive,
        indicator = true,
        method,
        ref,
        ...props
    }: NavigationMenuLinkProps) {
    const href = resolveUrl(to);
    const isActiveUrl = useIsCurrentRoute(to, { exact: false });
    const routeMethod = method ? method : 'get';
    const active = isActive || isActiveUrl;

    return (
        <NavigationMenuPrimitive.Link asChild active={active} ref={ref}  {...props}>
            <Link
                href={href}
                className={cn('relative hover:text-primary data-active:text-primary', className)}
                method={routeMethod}
            >
                {children}
                {indicator && active && (
                    <div className="w-full h-0.5 bg-primary" />
                )}
            </Link>
        </NavigationMenuPrimitive.Link>
    );
}

export {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    Trigger as NavigationMenuTrigger,
    Sub as NavigationMenuSub,
    Indicator as NavigationMenuIndicator,
    Content as NavigationMenuContent,
    Viewport as NavigationMenuViewport
};
