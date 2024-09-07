import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { AuthProviderContext, REQUIRED_AUTH_VALUE_CONTEXT } from '../context';
import { AuthProvider } from '../types';
import { useAuthProviderContext, useAuthenticationStatus } from '../hooks';
import { useAuthStore } from '../stores';

export type AuthAppBaseProps = {
  authLoadingComponent: ReactNode;
  children: ReactNode;
};

export type AuthAppProps = AuthAppBaseProps & {
  authProvider: AuthProvider<any>;
  requireAuth?: boolean;
};

export const AuthApp: FC<AuthAppProps> = ({
  children,
  authProvider,
  requireAuth = true,
  ...appBaseProps
}) => {
  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider value={{ requireAuth }}>
      <AuthProviderContext provider={authProvider}>
        <BrowserRouter>
          <AuthAppBase {...appBaseProps}>{children}</AuthAppBase>
        </BrowserRouter>
      </AuthProviderContext>
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};

const AuthAppBase: FC<Required<AuthAppBaseProps>> = ({
  children,
  authLoadingComponent,
}) => {
  const { provider: authProvider } = useAuthProviderContext();
  const setUserCredentials = useAuthStore(
    (authStore) => authStore.setUserCredentials
  );
  const setAuthenticationStatus = useAuthStore(
    (authStore) => authStore.setAuthenticationStatus
  );
  const setRole = useAuthStore((authStore) => authStore.setRole);
  const navigate = useNavigate();

  const { onError } = authProvider;
  const location = useLocation();

  const handleAuthError = useCallback(
    async (baseError: any) => {
      setAuthenticationStatus('NOT_CONNECTED');
      authProvider
        .checkError(baseError)
        .then(() => {
          onError({
            errorType: 'UNKNOWN_ERROR',
            isRequired: false,
            navigate,
          });
        })
        .catch(() => {
          authProvider
            .signout()
            .then(() => {
              onError({
                errorType: 'AUTHENTICATION_ERROR',
                isRequired: false,
                navigate,
              });
            })
            .catch(() => {
              onError({
                errorType: 'UNKNOWN_ERROR',
                isRequired: false,
                navigate,
              });
            });
        });
    },
    [authProvider, navigate]
  );

  const handleAuthSuccess = useCallback(
    async (userCredentials: any) => {
      setAuthenticationStatus('CONNECTED');
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
          onError({ errorType: 'UNKNOWN_ERROR', isRequired: false, navigate });
        });
    },
    [authProvider, navigate]
  );

  useEffect(() => {
    authProvider.checkAuth().then(handleAuthSuccess).catch(handleAuthError);
  }, [location, handleAuthSuccess, handleAuthError]);

  return (
    <AuthAppContent authLoadingComponent={authLoadingComponent}>
      {children}
    </AuthAppContent>
  );
};

const AuthAppContent: FC<Required<AuthAppBaseProps>> = ({
  authLoadingComponent,
  children,
}) => {
  const { authenticationStatus } = useAuthenticationStatus();

  if (authenticationStatus === 'UNKNOWN') {
    return authLoadingComponent;
  }

  return <>{children} </>;
};
