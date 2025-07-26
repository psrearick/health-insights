import AppSidebarHeader from '@/components/app-sidebar-header.tsx';
import AppSidebarFooter from '@/components/app-siderbar-footer.tsx';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation.tsx';
import {
  Sidebar,
  SidebarContent,
  SidebarDivider,
  useSidebar,
} from '@/components/ui/sidebar.tsx';
import { LayoutDashboard, PanelTop } from 'lucide-react';

export default function AppSidebar() {
  const { expanded } = useSidebar();

  return (
    <Sidebar
      className="group/side transition-[width] duration-300 ease-linear"
      data-expanded={expanded}
    >
      <AppSidebarHeader />
      <SidebarDivider />
      <SidebarContent>
        <NavigationMenu className="flex-col *:w-full" orientation="vertical">
          <NavigationMenuList className="flex flex-col gap-1 px-1 group-data-[expanded=true]/side:px-2">
            <NavigationMenuItem asChild>
              <NavigationMenuLink
                className="flex w-full gap-4 rounded-md p-2 text-gray-7 hover:bg-gray-1 hover:text-gray-10 data-active:bg-gray-1 data-active:text-gray-10 data-active:hover:text-gray-10"
                indicator={false}
                to="dashboard"
              >
                <LayoutDashboard className="size-6" />
                <span className="group-data-[expanded=false]/side:hidden">
                  Dashboard
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem asChild>
              <NavigationMenuLink
                className="flex w-full gap-4 rounded-md p-2 text-gray-7 hover:bg-gray-1 hover:text-gray-10 data-active:bg-gray-1 data-active:text-gray-10 data-active:hover:text-gray-10"
                indicator={false}
                to="/settings"
              >
                <PanelTop className="size-6" />
                <span className="group-data-[expanded=false]/side:hidden">
                  Settings
                </span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
