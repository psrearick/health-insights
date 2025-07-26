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
    sidebarSpacing: number;
    collapsedSidebarSpacing: number;
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

function createSize(defaultSize: number, size?: number): { baseSize: number; size: string; } {
    const baseSize = size ?? defaultSize;
    const calculatedSize = `${baseSize / 4}rem`;

    return {
        baseSize: baseSize,
        size: calculatedSize
    };
}

function createSizes(sizes: Partial<Sizes>): Sizes {
    const expandedSidebar = createSize(72, sizes.sidebarSpacing);
    const collapsedSidebar = createSize(16, sizes.collapsedSidebarSpacing);

    const defaultSizes = {
        sidebarWidth: expandedSidebar.size,
        sidebarSpacing: expandedSidebar.baseSize,
        collapsedSidebarWidth: collapsedSidebar.size,
        collapsedSidebarSpacing: collapsedSidebar.baseSize
    };

    return { ...defaultSizes, ...sizes };
}

interface SidebarProps extends ComponentProps<'div'> {
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    sizes: Partial<Sizes>;
}

function SidebarProvider({
                             children,
                             defaultExpanded = true,
                             expanded: controlledExpanded,
                             onExpandedChange,
                             sizes = {}
                         }: SidebarProps) {
    const getInitialExpanded = () => {
        if (typeof window === 'undefined') {
            return defaultExpanded;
        }

        const stored = localStorage.getItem('sidebar-expanded');
        return stored !== null ? JSON.parse(stored) : defaultExpanded;
    };

    const [internalExpanded, setInternalExpanded] = useState(getInitialExpanded);
    const isControlled = controlledExpanded !== undefined;
    const expanded = isControlled ? controlledExpanded : internalExpanded;
    const setExpanded = useCallback((value: boolean) => {
        if (!isControlled) {
            setInternalExpanded(value);

            localStorage.setItem('sidebar-expanded', JSON.stringify(value));
        }

        onExpandedChange?.(value);
    }, [isControlled, onExpandedChange]);


    const [openMobile, setOpenMobile] = useState(false);
    const isMobile = useIsMobile();

    const toggleSidebar = useCallback(() => {
        return isMobile ? setOpenMobile(open => !open) : setExpanded(!expanded);
    }, [expanded, isMobile, setExpanded]);

    const calculatedSizes = createSizes(sizes);

    const contextValue = useMemo<SidebarContext>(
        () => ({
            expanded,
            setExpanded,
            isMobile,
            openMobile,
            setOpenMobile,
            toggleSidebar,
            sizes: calculatedSizes
        }),
        [expanded, setExpanded, isMobile, openMobile, setOpenMobile, toggleSidebar, calculatedSizes]
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
            className={cn('h-full flex flex-col bg-gray-3 overflow-y-auto w-[var(--sidebar-width-collapsed)] aria-expanded:w-[var(--sidebar-width)]', className)}
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
            <div className={expanded ? '' : 'border-b-1 border-gray-5'} />
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
