import { LogoIcon } from '@/components/logo-icon.tsx';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation';
import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Header() {
  const { auth } = usePage<SharedData>().props;
  return (
    <header className="mb-6 w-full text-sm not-has-[nav]:hidden">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink to="home" indicator={false}>
              <LogoIcon />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink to="home">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        {auth.user ? (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink to="dashboard">Dashboard</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        ) : (
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink to="login">Log In</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink to="register">Register</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
      </NavigationMenu>
    </header>
  );
}
