import React, { createContext, FC } from 'react';

import { ReactQueryProvider } from './react-query-provider';
import {
  FacadeProvider,
  ResourceType,
  Provider,
  RequiredResourceName,
} from '../types';

export const PROVIDER_CONTEXT = createContext<FacadeProvider | null>(null);

const getProvider = <T extends ResourceType = any>({
  providers,
  resource,
}: { providers: Provider<any>[] } & RequiredResourceName): Provider<T> => {
  const providerValue = providers.find(
    (resourceProvider) => resourceProvider.resource === resource
  );
  if (!providerValue) {
    throw new Error(`Unknown resource: ${resource}`);
  }
  return providerValue;
};

export const ProviderContext: FC<{
  providers: Provider<any>[];
  children: React.ReactNode;
}> = ({ children, providers }) => {
  return (
    <ReactQueryProvider>
      <PROVIDER_CONTEXT.Provider
        value={{
          providers,
          getProvider: ({ resource }) => getProvider({ providers, resource }),
        }}
      >
        {children}
      </PROVIDER_CONTEXT.Provider>
    </ReactQueryProvider>
  );
};
