import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils.ts';
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
    target?: string;
    targetParams?: object | string | number;
    href: string;
    isActive?: boolean;
    children?: ReactNode;
    className?: string;
}

function NavigationMenuLink(
    {
        className,
        children,
        target,
        targetParams,
        href,
        isActive,
        ...props
    }: NavigationMenuLinkProps) {

    const currentRoute = route().current() ?? '';
    const currentHref = route(currentRoute);
    const targetHref = target ? targetParams ? route(target, targetParams) : route(target) : href;

    // let link = href ? href : route(route().current());
    // console.log(target, route(route().current()));
    // // isActive = isActive ?
    //
    //
    // // const active = isActive || route().current(target);

    return (
        <NavigationMenuPrimitive.Link asChild active={isActive}  {...props}>
            <Link href={link} className={className}>
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
