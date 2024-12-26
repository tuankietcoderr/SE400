import Sidebar from '@/components/Sidebar';
import {AuthProvider} from '@/context/AuthContext';
import {getCurrentUserAction} from '@/services/auth';
import {redirect} from 'next/navigation';
import {PropsWithChildren} from 'react';

const layout = async ({children}: PropsWithChildren) => {
  const user = await getCurrentUserAction();
  if (!user) {
    redirect('/login');
  }
  return (
    <AuthProvider initialUser={user}>
      <div className="flex max-h-screen">
        <Sidebar />
        <div className="max-h-screen flex-1 overflow-auto p-8">{children}</div>
      </div>
    </AuthProvider>
  );
};

export default layout;
