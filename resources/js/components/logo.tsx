import LogoIcon from './logo-icon.tsx';

export default function Logo({
                                 size = 'md',
                                 bg = 'sidebar'
                             }: { size?: 'sm' | 'md' | 'lg'; bg?: string } = {}) {
    const sizeClasses = {
        sm: { size: 'size-6', fontSize: 'text-lg' },
        md: { size: 'size-8', fontSize: 'text-xl' },
        lg: { size: 'size-20', fontSize: 'text-5xl' }
    };
    const bgClass = bg ? '' : 'bg-sidebar';
    return (
        <div className={`flex items-center ${bgClass} text-sidebar-primary`}>
            <div
                className={`flex aspect-square ${sizeClasses[size].size} items-center justify-center text-primary`}
            >
                <LogoIcon className="fill-current" />
            </div>
            <div className={`flex flex-1 text-left ${sizeClasses[size].fontSize}`}>
        <span className="mb-0.5 truncate leading-tight font-bold text-primary">
          Health
        </span>
                <span className="mb-0.5 truncate leading-tight text-primary-darker dark:text-primary-lighter">
          Insights
        </span>
            </div>
        </div>
    );
}
