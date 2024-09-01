import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { Provider, ProviderContext } from '@dashify/providers';
import { AuthProviderContext, REQUIRED_AUTH_VALUE_CONTEXT } from '../context';
import { AuthProvider } from '../types';
import { useAuthProviderContext, useAuthenticationStatus } from '../hooks';
import { useAuthStore } from '../stores';

export type DashboardBaseProps = {
  authLoadingComponent: ReactNode;
  children: ReactNode;
};

export type DashboardProps = DashboardBaseProps & {
  providers: Provider<any>[];
  authProvider: AuthProvider<any>;
  requireAuth?: boolean;
};

export const Dashboard: FC<DashboardProps> = ({
  children,
  authProvider,
  providers,
  requireAuth = true,
  ...appBaseProps
}) => {
  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider value={{ requireAuth }}>
      <AuthProviderContext provider={authProvider}>
        <ProviderContext providers={providers}>
          <BrowserRouter>
            <DashboardBase {...appBaseProps}>{children}</DashboardBase>
          </BrowserRouter>
        </ProviderContext>
      </AuthProviderContext >
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};

const DashboardBase: FC<Required<DashboardBaseProps>> = ({ children, authLoadingComponent }) => {
  const { provider: authProvider } = useAuthProviderContext();
  const setUserCredentials = useAuthStore(authStore => authStore.setUserCredentials);
  const setAuthenticationStatus = useAuthStore(authStore => authStore.setAuthenticationStatus);
  const setRole = useAuthStore(authStore => authStore.setRole);
  const navigate = useNavigate();

  const { onError } = authProvider;
  const location = useLocation();

  const handleAuthError = useCallback(
    async (baseError: any) => {
      setAuthenticationStatus("NOT_CONNECTED");
      authProvider
        .checkError(baseError)
        .then(() => {
          onError({
            errorType: "UNKNOWN_ERROR",
            isRequired: false,
            navigate
          });
        })
        .catch(() => {
          authProvider
            .signout()
            .then(() => {
              onError({
                errorType: "AUTHENTICATION_ERROR",
                isRequired: false,
                navigate
              });
            })
            .catch(() => {
              onError({
                errorType: "UNKNOWN_ERROR",
                isRequired: false,
                navigate
              });
            });
        });
    },
    [authProvider, navigate]
  );

  const handleAuthSuccess = useCallback(
    async (userCredentials: any) => {
      setAuthenticationStatus("CONNECTED");
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
          onError({ errorType: "UNKNOWN_ERROR", isRequired: false, navigate });
        });
    },
    [authProvider, navigate]
  );

  useEffect(() => {
    authProvider.checkAuth().then(handleAuthSuccess).catch(handleAuthError);
  }, [location]);

  return (
    <DashboardContent authLoadingComponent={authLoadingComponent}>
      {children}
    </DashboardContent>
  )
};

const DashboardContent: FC<Required<DashboardBaseProps>> = ({ authLoadingComponent, children }) => {
  const { authenticationStatus } = useAuthenticationStatus();

  if (authenticationStatus === "UNKNOWN") {
    return authLoadingComponent;
  }

  return <>{children} </>
}
