import Logo from '@/components/logo.tsx';
import PublicLayout from '@/layouts/public-layout.tsx';

export default function Home() {
  return (
    <PublicLayout title="Home">
      <div className="flex flex-1 items-center justify-center opacity-100 transition-opacity duration-750 starting:opacity-0">
        <main className="w-full max-w-xs lg:max-w-4xl lg:flex-row">
          <div className="flex items-center justify-center py-8">
            <Logo size="lg" />
          </div>
          <div className="flex-1 rounded-lg border border-foreground p-6 pb-12 text-sm leading-5 lg:p-20">
            <h1 className="mb-1 font-medium">Let's get started</h1>
          </div>
        </main>
      </div>
      <div className="hidden h-48 lg:block"></div>
    </PublicLayout>
  );
}
