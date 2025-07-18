import Logo from '@/components/logo.tsx';
import PublicLayout from '@/layouts/public-layout.tsx';

export default function Home() {

    return (
        <PublicLayout title="Home">
            {/*<div>*/}
            {/*<header className="mb-6 w-full max-w-xs text-sm not-has-[nav]:hidden lg:max-w-4xl">*/}
            {/*    <nav className="flex items-center justify-end gap-4">*/}
            {/*        {auth.user ? (*/}
            {/*            <Link*/}
            {/*                href={route('dashboard')}*/}
            {/*                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"*/}
            {/*            >*/}
            {/*                Dashboard*/}
            {/*            </Link>*/}
            {/*        ) : (*/}
            {/*            <>*/}
            {/*                <Link*/}
            {/*                    href={route('login')}*/}
            {/*                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-foreground hover:border-primary"*/}
            {/*                >*/}
            {/*                    Log in*/}
            {/*                </Link>*/}
            {/*                <Link*/}
            {/*                    href={route('register')}*/}
            {/*                    className="inline-block rounded-sm border border-foreground px-5 py-1.5 text-sm leading-normal text-foreground hover:border-primary"*/}
            {/*                >*/}
            {/*                    Register*/}
            {/*                </Link>*/}
            {/*            </>*/}
            {/*        )}*/}
            {/*    </nav>*/}
            {/*</header>*/}
            <div
                className="opacity-100 flex-1 flex justify-center items-center transition-opacity duration-750 starting:opacity-0"
            >
                <main className="w-full max-w-xs lg:max-w-4xl lg:flex-row">
                    <div className="flex items-center justify-center py-8">
                        <Logo size="lg" />
                    </div>
                    <div
                        className="flex-1 rounded-lg border border-muted-foreground bg-background p-6 pb-12 text-sm leading-5 text-foreground lg:p-20">
                        <h1 className="mb-1 font-medium">Let's get started</h1>
                    </div>
                </main>
            </div>
            <div className="hidden h-48 lg:block"></div>
            {/*</div>*/}
        </PublicLayout>
    );
}
