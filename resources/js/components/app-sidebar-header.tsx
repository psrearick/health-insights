import Logo from '@/components/logo.tsx';
import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar.tsx';
import { cn } from '@/lib/utils.ts';
import { Link } from '@inertiajs/react';

export default function AppSidebarHeader() {
  const { expanded } = useSidebar();
  return (
    <div className="h-[calc(var(--sidebar-width-collapsed)*2)]">
      <SidebarHeader
        className={cn(
          'flex flex-col items-center justify-between gap-4 p-2 group-aria-expanded/side:flex-row-reverse'
        )}
      >
        <SidebarTrigger />
        <Link href={route('dashboard')} prefetch>
          <Logo
            size="sm"
            textExpanded={expanded}
            hasText={true}
            textWidth="w-[calc(var(--sidebar-width)*0.66)]"
          />
        </Link>
      </SidebarHeader>
    </div>
  );
}
