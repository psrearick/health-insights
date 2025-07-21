import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import Button from '@/components/ui/button';
import {
  FormCheckbox,
  FormContainer,
  FormControl,
  FormField,
  FormFieldset,
  FormInput,
  FormInputError,
  FormLabel,
  FormPasswordInput,
} from '@/components/ui/form.tsx';
import TextLink from '@/components/ui/text-link.tsx';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<LoginForm>
  >({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout
      title="Log in to your account"
      description="Enter your email and password below to log in"
    >
      <Head title="Log in" />

      <FormContainer onSubmit={submit}>
        <FormFieldset className="my-4">
          <FormField
            name="email"
            label="Email Address"
            error={errors.email}
            required
          >
            <FormInput
              autoComplete="email"
              type="email"
              placeholder="email@example.com"
              autoFocus
              tabIndex={1}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
          </FormField>

          <FormField
            name="password"
            label={
              <div className="flex w-full items-center justify-between">
                <span>
                  Password
                  <span className="ml-1 text-destructive" aria-label="required">
                    *
                  </span>
                </span>
                {canResetPassword && (
                  <TextLink
                    href={route('password.request')}
                    tabIndex={6}
                    className="text-sm text-muted-foreground"
                  >
                    Forgot Password?
                  </TextLink>
                )}
              </div>
            }
            error={errors.password}
            required
          >
            <FormPasswordInput
              tabIndex={2}
              placeholder="Password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
            />
          </FormField>

          <FormControl>
            <div className="flex items-center gap-4">
              <FormCheckbox
                id="remember"
                name="remember"
                checked={data.remember}
                onClick={() => setData('remember', !data.remember)}
                tabIndex={4}
              />
              <FormLabel htmlFor="remember">Remember me</FormLabel>
              <FormInputError id="remember-error" message={errors.remember} />
            </div>
          </FormControl>
        </FormFieldset>

        <Button
          type="submit"
          className="my-4 w-full"
          tabIndex={5}
          disabled={processing}
        >
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Log in
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <TextLink href={route('register')} tabIndex={7}>
            Sign up
          </TextLink>
        </div>
      </FormContainer>

      {status && (
        <div className="mb-4 text-center text-sm font-medium text-primary-6">
          {status}
        </div>
      )}
    </AuthLayout>
  );
}
