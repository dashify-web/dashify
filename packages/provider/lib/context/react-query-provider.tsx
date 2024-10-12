import React, { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const defaultQueryClient = new QueryClient();

export const ReactQueryProvider: FC<{
  children: React.ReactNode;
  queryClient?: QueryClient;
}> = ({ queryClient = defaultQueryClient, children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
