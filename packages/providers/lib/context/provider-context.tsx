import React from 'react';
import { createContext, FC } from 'react';
import { Provider } from '../types';
import { ReactQueryProvider } from './react-query-provider';

export const PROVIDER_CONTEXT = createContext<Provider<any> | null>(null);

export const ProviderContext: FC<{
  provider: Provider<any>;
  children: React.ReactNode;
}> = ({ children, provider }) => {
  return (
    <ReactQueryProvider>
      <PROVIDER_CONTEXT.Provider value={provider}>
        {children}
      </PROVIDER_CONTEXT.Provider>
    </ReactQueryProvider>
  );
};
