import { cn } from '@/lib/utils.ts';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { LogoIcon } from './logo-icon.tsx';

const logoIconVariants = cva(
  'flex aspect-square items-center justify-center text-primary',
  {
    variants: {
      size: {
        default: 'size-12',
        sm: 'size-6',
        md: 'size-12',
        lg: 'size-20',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const logoTextVariants = cva(
  'flex flex-1 text-left transition-[width] duration-300 ease-linear',
  {
    variants: {
      size: {
        default: 'text-xl',
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-5xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

type logoType = ComponentProps<'div'> &
  VariantProps<typeof logoIconVariants> &
  VariantProps<typeof logoTextVariants> & {
    textWidth?: string;
    hasText?: boolean;
    textExpanded?: boolean;
  };

export default function Logo({
  className,
  size,
  hasText = true,
  textExpanded = true,
  textWidth = '',
  ...props
}: logoType) {
  return (
    <div className={cn('flex items-center', className)} {...props}>
      <div className={cn(logoIconVariants({ size }))}>
        <LogoIcon size="inherit" />
      </div>
      <div
        className={cn(
          logoTextVariants({ size }),
          hasText ? '' : 'hidden',
          textExpanded ? textWidth : 'w-0'
        )}
      >
        <span className="mb-0.5 truncate leading-tight font-bold text-primary-5">
          Health
        </span>
        <span className="mb-0.5 truncate leading-tight text-primary-9">
          Insights
        </span>
      </div>
    </div>
  );
}
