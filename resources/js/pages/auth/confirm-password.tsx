import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import Button from '@/components/ui/button';
import {
  Form,
  FormField,
  FormFieldset,
  FormPasswordInput,
} from '@/components/ui/form';
import AuthLayout from '@/layouts/auth-layout';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm<
    Required<{ password: string }>
  >({
    password: '',
  });

  const submit: FormEventHandler = e => {
    e.preventDefault();

    post(route('password.confirm'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout
      title="Confirm your password"
      description="This is a secure area of the application. Please confirm your password before continuing."
    >
      <Head title="Confirm password" />

      <Form onSubmit={submit}>
        <FormFieldset className="my-4">
          <FormField
            name="password"
            label="Password"
            error={errors.password}
            required
          >
            <FormPasswordInput
              placeholder="Password"
              autoComplete="current-password"
              value={data.password}
              autoFocus
              onChange={e => setData('password', e.target.value)}
            />
          </FormField>
        </FormFieldset>

        <Button type="submit" className="my-4 w-full" disabled={processing}>
          {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Confirm password
        </Button>
      </Form>
    </AuthLayout>
  );
}
