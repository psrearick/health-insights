import Button from '@/components/ui/button';
import {
  Form,
  FormField,
  FormFieldset,
  FormInput,
} from '@/components/ui/form.tsx';
import HeadingSmall from '@/components/ui/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

export default function Password() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const currentPasswordInput = useRef<HTMLInputElement>(null);

  const { data, setData, errors, put, reset, processing, recentlySuccessful } =
    useForm({
      current_password: '',
      password: '',
      password_confirmation: '',
    });

  const updatePassword: FormEventHandler = e => {
    e.preventDefault();

    put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => reset(),
      onError: errors => {
        if (errors.password) {
          reset('password', 'password_confirmation');
          passwordInput.current?.focus();
        }

        if (errors.current_password) {
          reset('current_password');
          currentPasswordInput.current?.focus();
        }
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Password settings" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Update password"
            description="Ensure your account is using a long, random password to stay secure"
          />

          <Form onSubmit={updatePassword} className="space-y-6">
            <FormFieldset>
              <FormField
                name="current_password"
                label="Current Password"
                error={errors.current_password}
              >
                <FormInput
                  ref={currentPasswordInput}
                  value={data.current_password}
                  onChange={e => setData('current_password', e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Current password"
                />
              </FormField>

              <FormField
                name="password"
                label="New Password"
                error={errors.password}
              >
                <FormInput
                  ref={passwordInput}
                  value={data.password}
                  onChange={e => setData('password', e.target.value)}
                  type="password"
                  autoComplete="new-password"
                  placeholder="New password"
                />
              </FormField>

              <FormField
                name="password_confirmation"
                label="Confirm Password"
                error={errors.password_confirmation}
              >
                <FormInput
                  value={data.password_confirmation}
                  onChange={e =>
                    setData('password_confirmation', e.target.value)
                  }
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm password"
                />
              </FormField>
            </FormFieldset>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save password</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Saved</p>
              </Transition>
            </div>
          </Form>
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
