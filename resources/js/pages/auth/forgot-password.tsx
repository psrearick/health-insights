import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import Button from '@/components/ui/button';
import {
  FormContainer,
  FormField,
  FormFieldset,
  FormInput,
} from '@/components/ui/form';
import TextLink from '@/components/ui/text-link';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm<
    Required<{ email: string }>
  >({
    email: '',
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();

    post(route('password.email'));
  };

  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email to receive a password reset link"
    >
      <Head title="Forgot password" />

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          {status}
        </div>
      )}

      <FormContainer onSubmit={submit}>
        <FormFieldset className="my-4">
          <FormField
            name="email"
            label="Email address"
            error={errors.email}
            required
          >
            <FormInput
              type="email"
              autoComplete="off"
              value={data.email}
              autoFocus
              onChange={e => setData('email', e.target.value)}
              placeholder="email@example.com"
            />
          </FormField>
        </FormFieldset>

        <Button type="submit" className="my-4 w-full" disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Email password reset link
        </Button>

        <div className="space-x-1 text-center text-sm text-muted-foreground">
          <span>Or, return to</span>
          <TextLink href={route('login')}>log in</TextLink>
        </div>
      </FormContainer>
    </AuthLayout>
  );
}
