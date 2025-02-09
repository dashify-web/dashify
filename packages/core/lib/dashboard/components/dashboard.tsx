import React, { FC, ReactNode } from 'react';
import { AuthApp, AuthAppProps } from '@dashify/auth';
import { ProviderContext, ProviderContextProps } from '@dashify/provider';

export type DashboardProps = AuthAppProps &
  ProviderContextProps & {
    children: ReactNode;
  };

export const Dashboard: FC<DashboardProps> = ({
  options,
  children,
  providers,
  requireAuth,
  authProvider,
  clientConfigurer,
  AuthLoadingComponent,
}) => {
  return (
    <AuthApp
      requireAuth={requireAuth}
      authProvider={authProvider}
      clientConfigurer={clientConfigurer}
      AuthLoadingComponent={AuthLoadingComponent}
    >
      <ProviderContext options={options} providers={providers}>
        {children}
      </ProviderContext>
    </AuthApp>
  );
};
