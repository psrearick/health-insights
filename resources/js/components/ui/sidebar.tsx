import {
    ComponentProps,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    MouseEvent,
    CSSProperties
} from 'react';
import { PanelLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

import Button from '../ui/button';

interface Sizes {
    sidebarWidth: string;
    collapsedSidebarWidth: string;
}

interface SidebarContext {
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    openMobile: boolean;
    setOpenMobile: (open: boolean) => void;
    isMobile: boolean;
    toggleSidebar: () => void;
    sizes: Sizes;
}

const SidebarContext = createContext<SidebarContext | null>(null);

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider.');
    }

    return context;
}

interface SidebarProps extends ComponentProps<'div'> {
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    sizes?: Sizes;
}

function SidebarProvider({
                             children,
                             defaultExpanded = true,
                             expanded: controlledExpanded,
                             onExpandedChange,
                             sizes = {
                                 sidebarWidth: '',
                                 collapsedSidebarWidth: ''
                             }
                         }: SidebarProps) {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const isControlled = controlledExpanded !== undefined;
    const expanded = isControlled ? controlledExpanded : internalExpanded;
    const setExpanded = useCallback((value: boolean) => {
        if (!isControlled) {
            setInternalExpanded(value);
        }

        onExpandedChange?.(value);
    }, [isControlled, onExpandedChange]);

    const [openMobile, setOpenMobile] = useState(false);
    const isMobile = useIsMobile();

    const toggleSidebar = useCallback(() => {
        return isMobile ? setOpenMobile(open => !open) : setExpanded(!expanded);
    }, [expanded, isMobile, setExpanded]);

    const contextValue = useMemo<SidebarContext>(
        () => ({
            expanded,
            setExpanded,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
            sizes
        }),
        [expanded, setExpanded, isMobile, openMobile, setOpenMobile, toggleSidebar, sizes]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <div
                className="group"
                style={
                    {
                        '--sidebar-width': contextValue.sizes.sidebarWidth,
                        '--sidebar-width-collapsed': contextValue.sizes.collapsedSidebarWidth
                    } as CSSProperties
                }
            >
                {children}
            </div>
        </SidebarContext.Provider>
    );
}

function Sidebar({ className, children, ...props }: ComponentProps<'div'>) {
    const { expanded, openMobile } = useSidebar();

    return (
        <div
            role="complementary"
            aria-label="Sidebar navigation"
            aria-expanded={expanded}
            data-state={openMobile ? 'open' : 'closed'}
            className={cn('h-full flex flex-col bg-gray-2 overflow-y-auto w-[var(--sidebar-width-collapsed)] aria-expanded:w-[var(--sidebar-width)]', className)}
            {...props}
        >
            {children}
        </div>
    );
}

function SidebarHeader({ className, children, ...props }: ComponentProps<'div'>) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}

function SidebarContent({ className, children, ...props }: ComponentProps<'div'>) {
    return (
        <div className={cn('flex-1', className)} {...props}>
            {children}
        </div>
    );
}

function SidebarFooter({ className, children, ...props }: ComponentProps<'div'>) {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
}

function SidebarTrigger({ className, onClick, ...props }: ComponentProps<typeof Button>) {
    const { toggleSidebar } = useSidebar();

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        toggleSidebar();
        onClick?.(event);
    }, [toggleSidebar, onClick]);

    return (
        <Button
            onClick={handleClick}
            className={className}
            {...props}
            size="icon"
            variant="ghost"
            aria-label="Toggle sidebar"
        >
            <PanelLeftIcon aria-hidden="true" />
        </Button>
    );
}

function SidebarDivider({ className, ...props }: ComponentProps<'div'>) {
    const { expanded } = useSidebar();

    return (
        <div className={cn(className, 'py-4', expanded ? 'px-4' : 'px-2')} {...props}>
            <div className="border-b-1 border-gray-5" />
        </div>
    );
}

export {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarTrigger,
    SidebarDivider,
    useSidebar,
    type Sizes
};
