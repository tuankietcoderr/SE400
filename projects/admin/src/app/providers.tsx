'use client';
import {NextUIProvider} from '@nextui-org/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {PropsWithChildren, useState} from 'react';
import {Toaster} from 'sonner';

type ProvidersProps = PropsWithChildren<{}>;

const Providers = ({children}: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="light">
          <main className="min-h-screen">{children}</main>
          <Toaster richColors position="top-right" closeButton />
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
