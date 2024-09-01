import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { Provider, ProviderContext } from '@dashify/providers';
import { AuthProviderContext, RequiredAuthValueContext } from '../context';
import { AuthenticationStatus, AuthErrorType, AuthProvider } from '../types';
import {
  useAuthProviderContext,
  useAuthenticationStatus,
  useRequiredAuthValueContext,
  useRole,
  useUserCredentials,
} from '../hooks';

export type DashboardBaseProps = {
  authLoadingComponent: ReactNode;
  children: ReactNode;
};

export type DashboardProps = DashboardBaseProps & {
  providers: Provider<any>[];
  authProvider: AuthProvider<any>;
  requiredAuth?: boolean;
};

export const Dashboard: FC<DashboardProps> = ({
  children,
  authProvider,
  providers,
  requiredAuth = true,
  ...appBaseProps
}) => {
  return (
    <AuthProviderContext provider={authProvider}>
      <RequiredAuthValueContext requireAuth={requiredAuth}>
        <BrowserRouter>
          <ProviderContext providers={providers}>
            <DashboardBase {...appBaseProps}>{children}</DashboardBase>
          </ProviderContext>
        </BrowserRouter>
      </RequiredAuthValueContext>
    </AuthProviderContext>
  );
};

const DashboardBase: FC<DashboardBaseProps> = ({ children, authLoadingComponent }) => {
  const { provider: authProvider } = useAuthProviderContext();
  const { setRole } = useRole();
  const { requireAuth } = useRequiredAuthValueContext();
  const { setUserCredentials } = useUserCredentials();
  const { authenticationStatus, setAuthenticationStatus } =
    useAuthenticationStatus();
  const { onError } = authProvider;
  const location = useLocation();

  const handleAuthError = useCallback(
    async (baseError: any) => {
      setAuthenticationStatus(AuthenticationStatus.CONNECTED);
      authProvider
        .checkError(baseError)
        .then(() => {
          onError({
            erroType: AuthErrorType.UNKNOWN_ERROR,
            isRequired: requireAuth,
          });
        })
        .catch(() => {
          authProvider
            .signout()
            .then(() => {
              onError({
                erroType: AuthErrorType.AUTHENTICATION_ERROR,
                isRequired: requireAuth,
              });
            })
            .catch(() => {
              onError({
                erroType: AuthErrorType.UNKNOWN_ERROR,
                isRequired: requireAuth,
              });
            });
        });
    },
    [authProvider]
  );

  const handleAuthSuccess = useCallback(
    async (userCredentials: any) => {
      setAuthenticationStatus(AuthenticationStatus.CONNECTED);
      setUserCredentials(userCredentials);

      if (!authProvider.getRole) {
        return;
      }

      authProvider
        .getRole(userCredentials)
        .then((role) => {
          setRole(role);
        })
        .catch(() => {
          onError({ erroType: AuthErrorType.UNKNOWN_ERROR, isRequired: false });
        });
    },
    [authProvider]
  );

  useEffect(() => {
    authProvider.checkAuth().then(handleAuthSuccess).catch(handleAuthError);
  }, [location, handleAuthSuccess, handleAuthError]);

  if (authenticationStatus === AuthenticationStatus.UNKNOWN) {
    return authLoadingComponent;
  }

  return <Routes>{children}</Routes>;
};
