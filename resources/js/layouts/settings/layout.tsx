import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation.tsx';
import { Separator } from '@/components/ui/separator';
import { type NavItem } from '@/types';
import { type PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: null,
  },
  {
    title: 'Password',
    href: '/settings/password',
    icon: null,
  },
  {
    title: 'Appearance',
    href: '/settings/appearance',
    icon: null,
  },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <div className="px-4 py-6">
      <Heading
        title="Settings"
        description="Manage your profile and account settings"
      />

      <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
        <aside className="w-full max-w-xl lg:w-48">
          <NavigationMenu className="flex-col *:w-full" orientation="vertical">
            <NavigationMenuList className="flex flex-col gap-1 px-2">
              {sidebarNavItems.map((item, index) => (
                <NavigationMenuItem className="w-full" key={index}>
                  <Button
                    className="w-full justify-start hover:bg-primary-4 hover:text-bw-foreground data-active:bg-primary-3 data-active:text-bw-foreground"
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <NavigationMenuLink
                      to={item.href}
                      prefetch
                      indicator={false}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Button>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </aside>

        <Separator className="my-6 md:hidden" />

        <div className="flex-1 md:max-w-2xl">
          <section className="max-w-xl space-y-12">{children}</section>
        </div>
      </div>
    </div>
  );
}
