import { SidebarFooter, useSidebar } from '@/components/ui/sidebar.tsx';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, UserRound } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

export default function AppSidebarFooter() {
  const { auth } = usePage<SharedData>().props;
  const { sizes, expanded } = useSidebar();

  return (
    <SidebarFooter>
      <DropdownMenu.Root>
        <DropdownMenu.DropdownMenuTrigger tabIndex={1} asChild>
          <div className="group/dropdown w-full p-2 focus-visible:outline-none">
            <div
              className={`flex items-center rounded-md text-gray-8 ring ring-gray-6 group-focus-visible/dropdown:bg-white/10 group-focus-visible/dropdown:text-gray-10 group-focus-visible/dropdown:ring-2 group-focus-visible/dropdown:ring-gray-8 group-aria-expanded/dropdown:bg-muted/50 group-aria-expanded/dropdown:text-gray-10 group-aria-expanded/dropdown:ring-2 group-aria-expanded/dropdown:ring-gray-8 hover:cursor-pointer hover:bg-white/10 hover:text-gray-10 hover:ring-2 hover:ring-gray-8 ${expanded ? 'justify-between p-2.5' : 'justify-center p-1'}`}
            >
              <div className="flex items-center gap-2">
                <UserRound className={`${expanded ? 'size-6' : 'size-5'}`} />
                <div className={`${expanded ? '' : 'hidden'}`}>
                  {auth.user.name}
                </div>
              </div>
              <ChevronDown className={`${expanded ? '' : 'hidden'} size-4`} />
            </div>
          </div>
        </DropdownMenu.DropdownMenuTrigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={`w-[${sizes.sidebarWidth}] px-2`}>
            <div className="rounded-md border-2 border-gray-6 bg-muted/50 p-1">
              <DropdownMenu.Item asChild>
                <Link
                  href="/settings"
                  as="button"
                  className="w-full cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-1 hover:outline-none focus:bg-gray-1 focus-visible:outline-none"
                >
                  Settings
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="w-full cursor-pointer rounded-md px-2 py-1 text-left hover:bg-gray-1 hover:outline-none focus:bg-gray-1 focus-visible:outline-none"
                >
                  Logout
                </Link>
              </DropdownMenu.Item>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </SidebarFooter>
  );
}
