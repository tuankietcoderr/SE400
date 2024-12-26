'use client';
import {useLoginUserMutation} from '@/services/auth';
import {Button, Form, Input} from '@nextui-org/react';
import {toast} from 'sonner';

const LoginForm = () => {
  const loginMutation = useLoginUserMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    loginMutation.mutate(
      {email, password},
      {
        onSuccess: data => {
          if (!data.success) {
            toast.error(data.message);
            return;
          }
          location.href = '/hotel';
        },
        onError: error => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-xl rounded-lg border p-4">
        <Form validationBehavior="native" className="gap-4" onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Đăng nhập</h1>
          <Input
            autoFocus
            isRequired
            errorMessage="Vui lòng nhập Email/SĐT"
            label="Email/SĐT"
            labelPlacement="outside"
            name="email"
            placeholder="Nhập Email/SĐT"
            type="text"
          />
          <Input
            isRequired
            errorMessage="Vui lòng nhập mật khẩu"
            label="Mật khẩu"
            labelPlacement="outside"
            name="password"
            placeholder="Nhập mật khẩu"
            type="password"
          />
          <Button type="submit" color="primary">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
