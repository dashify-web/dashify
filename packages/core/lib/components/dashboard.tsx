import React, { FC, ReactNode } from 'react';
import { AuthApp, AuthAppProps } from '@dashify/auth-routes';
import { ProviderContext, ProviderContextProps } from '@dashify/providers';

export type DashboardProps = AuthAppProps &
  ProviderContextProps & {
    children: ReactNode;
  };

export const Dashboard: FC<DashboardProps> = ({
  providers,
  authProvider,
  children,
  requireAuth,
  authLoadingComponent,
}) => {
  return (
    <AuthApp
      authLoadingComponent={authLoadingComponent}
      requireAuth={requireAuth}
      authProvider={authProvider}
    >
      <ProviderContext providers={providers}>{children}</ProviderContext>
    </AuthApp>
  );
};
