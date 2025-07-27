import Button from '@/components/ui/button';
import {
  Form,
  FormField,
  FormFieldset,
  FormInput,
  FormPasswordInput,
} from '@/components/ui/form';
import TextLink from '@/components/ui/text-link.tsx';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<RegisterForm>
  >({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />

      <Form onSubmit={submit}>
        <FormFieldset className="my-4 space-y-4">
          <FormField name="name" label="Name" error={errors.name} required>
            <FormInput
              autoComplete="name"
              autoFocus
              tabIndex={1}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Full name"
            />
          </FormField>

          <FormField name="email" label="Email" error={errors.email} required>
            <FormInput
              type="email"
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
          </FormField>

          <FormField
            name="password"
            label="Password"
            error={errors.password}
            required
          >
            <FormPasswordInput
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Password"
            />
          </FormField>

          <FormField
            name="password_confirmation"
            label="Confirm Password"
            error={errors.password_confirmation}
            required
          >
            <FormPasswordInput
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={e => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
            />
          </FormField>
        </FormFieldset>

        <Button
          type="submit"
          className="my-4 w-full"
          tabIndex={5}
          disabled={processing}
        >
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Create account
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <TextLink href={route('login')} tabIndex={6}>
            Log in
          </TextLink>
        </div>
      </Form>
    </AuthLayout>
  );
}
