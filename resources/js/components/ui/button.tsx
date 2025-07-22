import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from 'radix-ui';
import { ComponentProps } from 'react';

const buttonVariants = cva(
    cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap',
        'rounded-md text-sm font-medium',
        'transition-[color,box-shadow,background,border]',
        'outline-none border-0',
        'focus-visible:outline-none focus-visible:border-2',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 aria-invalid:border-destructive'
    ),
    {
        variants: {
            variant: {
                default: cn(
                    'shadow-sm focus-visible:ring-3 border-none',
                    'bg-primary focus-visible:border-muted text-primary-foreground focus-visible:ring-primary/50 hover:bg-primary-accent hover:text-primary-accent-foreground shadow-primary'
                ),
                destructive: 'border-destructive bg-destructive text-destructive-foreground focus-visible:ring-destructive/50 hover:bg-destructive-accent hover:text-destructive-accent-foreground shadow-sm shadow-destructive',
                outline: 'border border-muted-foreground text-muted-foreground bg-transparent shadow-sm shadow-muted/50 hover:bg-muted hover:border-muted focus-visible:ring-muted/50 focus-visible:border-muted',
                ghost: 'text-muted-foreground bg-transparent hover:text-foreground/60 hover:bg-muted/50 focus-visible:ring-muted/50 focus-visible:text-foreground/60',
                link: 'text-primary underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-9 px-5 py-2',
                sm: 'h-8 px-4',
                lg: 'h-10 px-6',
                icon: 'size-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

export default function Button({
                                   className,
                                   variant,
                                   size,
                                   asChild = false,
                                   ...props
                               }: ButtonProps) {
    const Comp = asChild ? Slot.Root : 'button';

    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}
