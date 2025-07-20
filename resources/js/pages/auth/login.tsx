import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components-bak/ui/button';
import {
  FormCheckbox,
  FormContainer,
  FormControl,
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
          <FormControl name="email" className="">
            <FormLabel>Email Address</FormLabel>
            <FormInput
              autoComplete="email"
              type="email"
              placeholder="email@example.com"
              autoFocus
              required
              tabIndex={1}
              value={data.email}
              onChange={e => setData('email', e.target.value)}
            />
            <FormInputError message={errors.email} />
          </FormControl>

          <FormControl name="password">
            <FormLabel>
              <div className="flex items-center">
                <FormLabel
                  htmlFor="password"
                  className="flex w-full items-center justify-between"
                >
                  <span>Password</span>
                  {canResetPassword && (
                    <TextLink
                      href={route('password.request')}
                      tabIndex={6}
                      className="text-sm"
                    >
                      Forgot Password?
                    </TextLink>
                  )}
                </FormLabel>
              </div>
            </FormLabel>
            <FormPasswordInput
              required
              tabIndex={2}
              placeholder="Password"
              onChange={e => setData('password', e.target.value)}
            />
            <FormInputError message={errors.password} />
          </FormControl>

          <FormControl name="remember">
            <div className="flex items-center gap-4">
              <FormCheckbox
                id="remember"
                name="remember"
                checked={data.remember}
                onClick={() => setData('remember', !data.remember)}
                tabIndex={4}
              />
              <FormLabel htmlFor="remember">Remember me</FormLabel>
              <FormInputError message={errors.remember} />
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
