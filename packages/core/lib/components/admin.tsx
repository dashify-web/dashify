import React, { FC } from 'react';
import { Provider, ProviderContext } from '@dashify/providers';

export type AppProps = {
  title: string;
  providers: Provider<any>[];
  children: React.ReactNode;
};

export const App: FC<AppProps> = ({ children, providers }) => {
  return <ProviderContext providers={providers}>{children}</ProviderContext>;
};
