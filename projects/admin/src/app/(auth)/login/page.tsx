import {Metadata} from 'next';
import LoginForm from './_components/LoginForm';

export const metadata: Metadata = {
  title: 'Đăng nhập',
};

const page = () => {
  return <LoginForm />;
};

export default page;
