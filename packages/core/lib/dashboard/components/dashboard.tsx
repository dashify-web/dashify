import React, { FC, ReactNode } from 'react';
import { AuthApp, AuthAppProps } from '@dashify/auth';
import { ProviderContext, ProviderContextProps } from '@dashify/provider';

export type DashboardProps = AuthAppProps &
  ProviderContextProps & {
    children: ReactNode;
  };

export const Dashboard: FC<DashboardProps> = ({
  providers,
  authProvider,
  children,
  requireAuth,
  AuthLoadingComponent,
}) => {
  return (
    <AuthApp
      AuthLoadingComponent={AuthLoadingComponent}
      requireAuth={requireAuth}
      authProvider={authProvider}
    >
      <ProviderContext providers={providers}>{children}</ProviderContext>
    </AuthApp>
  );
};
