import React, { createContext, FC, ReactNode } from 'react';

import { ReactQueryProvider } from './react-query-provider';
import {
  Provider,
  ResourceType,
  FacadeProvider,
  RequiredResourceName,
  FacadeProviderOptions,
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

export type ProviderContextProps = Pick<FacadeProvider, 'providers'> & {
  options?: FacadeProviderOptions;
  children: ReactNode;
};

export const ProviderContext: FC<ProviderContextProps> = ({
  children,
  providers,
  options,
}) => {
  return (
    <ReactQueryProvider>
      <PROVIDER_CONTEXT.Provider
        value={{
          providers,
          options: options ?? {},
          getProvider: ({ resource }) => getProvider({ providers, resource }),
        }}
      >
        {children}
      </PROVIDER_CONTEXT.Provider>
    </ReactQueryProvider>
  );
};
