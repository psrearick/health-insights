import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/settings/appearance-tabs.tsx';
import HeadingSmall from '@/components/ui/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function Appearance() {
  return (
    <AppLayout>
      <Head title="Appearance settings" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Appearance Settings"
            description="Update your account's appearance settings"
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
