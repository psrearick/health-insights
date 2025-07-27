import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import Button from '@/components/ui/button';
import {
  Form,
  FormField,
  FormFieldset,
  FormInput,
} from '@/components/ui/form.tsx';
import HeadingSmall from '@/components/ui/heading-small';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function DeleteUser() {
  const passwordInput = useRef<HTMLInputElement>(null);
  const {
    data,
    setData,
    delete: destroy,
    processing,
    reset,
    errors,
    clearErrors,
  } = useForm<Required<{ password: string }>>({ password: '' });

  const deleteUser: FormEventHandler = e => {
    e.preventDefault();

    destroy(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordInput.current?.focus(),
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
  };

  return (
    <div className="space-y-6">
      <HeadingSmall
        title="Delete account"
        description="Delete your account and all of its resources"
      />
      <div className="space-y-4 rounded-lg border-2 border-red-5 bg-red-1 p-4">
        <div className="relative space-y-0.5 text-red-9">
          <p className="font-medium">Warning</p>
          <p className="text-sm">
            Please proceed with caution. This cannot be undone.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              Are you sure you want to delete your account?
            </DialogTitle>
            <DialogDescription>
              Once your account is deleted, all of its resources and data will
              also be permanently deleted. Please enter your password to confirm
              you would like to permanently delete your account.
            </DialogDescription>
            <Form onSubmit={deleteUser} className="space-y-6">
              <FormFieldset>
                <FormField
                  name="password"
                  label="Password"
                  error={errors.password}
                  required
                >
                  <FormInput
                    placeholder="Password"
                    autoComplete="current-password"
                    ref={passwordInput}
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                  />
                </FormField>
              </FormFieldset>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                </DialogClose>

                <Button variant="destructive" disabled={processing} asChild>
                  <button type="submit">Delete Account</button>
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
