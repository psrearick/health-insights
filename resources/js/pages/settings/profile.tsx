import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/settings/delete-user.tsx';
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

type ProfileForm = {
  name: string;
  email: string;
};

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean;
  status?: string;
}) {
  const { auth } = usePage<SharedData>().props;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm<Required<ProfileForm>>({
      name: auth.user.name,
      email: auth.user.email,
    });

  const submit: FormEventHandler = e => {
    e.preventDefault();

    patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div>
          <div className="mb-4">
            <HeadingSmall
              title="Profile information"
              description="Update your name and email address"
            />
          </div>

          <Form onSubmit={submit}>
            <FormFieldset className="space-y-2">
              <FormField name="name" label="Name" error={errors.name}>
                <FormInput
                  placeholder="Enter your name"
                  tabIndex={1}
                  value={data.name}
                  onChange={e => setData('name', e.target.value)}
                  required
                />
              </FormField>

              <FormField name="email" label="Email" error={errors.email}>
                <FormInput
                  placeholder="Enter your email address"
                  type="email"
                  value={data.email}
                  onChange={e => setData('email', e.target.value)}
                  required
                />
              </FormField>

              {mustVerifyEmail && auth.user.email_verified_at === null && (
                <div>
                  <p className="-mt-4 text-sm text-muted-foreground">
                    Your email address is unverified.{' '}
                    <Link
                      href={route('verification.send')}
                      method="post"
                      as="button"
                      className="text-gray-7 underline decoration-gray-5 underline-offset-4 transition-colors duration-300 ease-out hover:cursor-pointer hover:text-gray-11 hover:decoration-gray-8"
                    >
                      Click here to resend the verification email.
                    </Link>
                  </p>

                  {status === 'verification-link-sent' && (
                    <div className="mt-2 text-sm font-medium text-green-600">
                      A new verification link has been sent to your email
                      address.
                    </div>
                  )}
                </div>
              )}
            </FormFieldset>

            <div className="my-8 flex items-center gap-4">
              <Button disabled={processing}>Save</Button>

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

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}
