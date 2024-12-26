'use client';
import {useLogoutUserMutation} from '@/services/auth';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
};

type AuthProviderProps = PropsWithChildren<{
  initialUser?: any;
}>;
export const AuthProvider = ({children, initialUser}: AuthProviderProps) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const logoutUserMutation = useLogoutUserMutation();

  const logout = () => {
    logoutUserMutation.mutate(undefined, {
      onSuccess: () => {
        location.href = '/login';
      },
    });
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout,
  } satisfies AuthContextType;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
