import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink
} from '@/components/ui/navigation';
import LogoIcon from '@/components/logo-icon.tsx';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';

export default function Header() {
    const { auth } = usePage<SharedData>().props;
    return (
        <header
            className="mb-6 w-full text-sm not-has-[nav]:hidden"
        >
            <NavigationMenu className="w-full my-0 mx-auto max-w-xs lg:max-w-4xl justify-between">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink to="home">
                            <LogoIcon className="h-6 w-6 fill-current text-primary" />
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink to="/">
                            Home
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>

                {auth.user ? (
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            Dashboard
                        </NavigationMenuItem>
                    </NavigationMenuList>
                ) : (
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink to="login">
                                Log In
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink to="register">
                                Register
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>

                )}
            </NavigationMenu>
        </header>
    );
}
