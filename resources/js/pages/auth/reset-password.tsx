import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import Button from '@/components/ui/button';
import {
  FormContainer,
  FormField,
  FormFieldset,
  FormInput,
  FormPasswordInput,
} from '@/components/ui/form';
import AuthLayout from '@/layouts/auth-layout';

interface ResetPasswordProps {
  token: string;
  email: string;
}

type ResetPasswordForm = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<ResetPasswordForm>
  >({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();
    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout
      title="Reset password"
      description="Please enter your new password below"
    >
      <Head title="Reset password" />

      <FormContainer onSubmit={submit}>
        <FormFieldset className="my-4">
          <FormField name="email" label="Email" error={errors.email}>
            <FormInput
              type="email"
              autoComplete="email"
              value={data.email}
              readOnly
              onChange={e => setData('email', e.target.value)}
            />
          </FormField>

          <FormField
            name="password"
            label="Password"
            error={errors.password}
            required
          >
            <FormPasswordInput
              autoComplete="new-password"
              value={data.password}
              autoFocus
              onChange={e => setData('password', e.target.value)}
              placeholder="Password"
            />
          </FormField>

          <FormField
            name="password_confirmation"
            label="Confirm password"
            error={errors.password_confirmation}
            required
          >
            <FormPasswordInput
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={e => setData('password_confirmation', e.target.value)}
              placeholder="Confirm password"
            />
          </FormField>
        </FormFieldset>

        <Button type="submit" className="my-4 w-full" disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Reset password
        </Button>
      </FormContainer>
    </AuthLayout>
  );
}
