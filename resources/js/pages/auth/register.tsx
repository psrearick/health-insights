import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

// import InputError from '@/components-bak/input-error';
// import TextLink from '@/components-bak/text-link';
// import { Button } from '@/components-bak/ui/button';
// import { Input } from '@/components-bak/ui/input';
// import { Label } from '@/components-bak/ui/label';
import Button from '@/components/ui/button';
import {
  FormContainer,
  FormControl,
  FormFieldset,
  FormInput,
  FormInputError,
  FormLabel,
  FormPasswordInput,
} from '@/components/ui/form';
import TextLink from '@/components/ui/text-link.tsx';
import AuthLayout from '@/layouts/auth-layout';

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

      <FormContainer onSubmit={submit}>
        <FormFieldset className="my-4">
          <FormControl name="name">
            <FormLabel>Name</FormLabel>
            <FormInput
              autoComplete="name"
              required
              autoFocus
              tabIndex={1}
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Full name"
            />
            <FormInputError message={errors.name} />
          </FormControl>

          <FormControl name="email">
            <FormLabel>Email</FormLabel>
            <FormInput
              inputType="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <FormInputError message={errors.email} />
          </FormControl>

          <FormControl name="password">
            <FormLabel>Password</FormLabel>
            <FormPasswordInput
              tabIndex={3}
              required
              autoComplete="new-password"
              value={data.password}
              onChange={e => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Password"
            />
            <FormInputError message={errors.password} />
          </FormControl>

          <FormControl name="password_confirmation">
            <FormLabel>Confirm Password</FormLabel>
            <FormPasswordInput
              tabIndex={4}
              required
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={e => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
            />
            <FormInputError message={errors.password_confirmation} />
          </FormControl>
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
      </FormContainer>
    </AuthLayout>
  );
}
