import React, {
  ComponentType,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BrowserRouter, Routes, useLocation } from 'react-router-dom';
import { Provider, ProviderContext } from '@dashify/providers';
import { AuthProviderContext, RequiredAuthValueContext } from '../context';
import { AuthProvider } from '../types';
import { useAdminStore } from '../stores';
import {
  useAuthProviderContext,
  useRequiredAuthValueContext,
  useRole,
} from '../hooks';
import { useAuthenticationStatus } from '../hooks/auth/use-authentication-status';

export type AuthenticationErrorType<AuthError = any> = {
  authError?: { error: AuthError };
  unknownError?: { data?: any; error: any };
};

export type AppBaseProps = {
  AuthLoadingComponent: ComponentType;
  AuthErrorComponent: ComponentType<AuthenticationErrorType>;
  children: ReactNode;
};

export type AppProps = AppBaseProps & {
  title: string;
  providers: Provider<any>[];
  authProvider: AuthProvider<any>;
  requiredAuth?: boolean;
};

export const App: FC<AppProps> = ({
  title,
  children,
  authProvider,
  providers,
  requiredAuth = true,
  ...appBaseProps
}) => {
  const setTitle = useAdminStore((adminStore) => adminStore.setTitle);

  useEffect(() => {
    setTitle(title);
  }, [title, setTitle]);

  return (
    <AuthProviderContext provider={authProvider}>
      <RequiredAuthValueContext requireAuth={requiredAuth}>
        <BrowserRouter>
          <ProviderContext providers={providers}>
            <AppBase {...appBaseProps}>{children}</AppBase>
          </ProviderContext>
        </BrowserRouter>
      </RequiredAuthValueContext>
    </AuthProviderContext>
  );
};

const AppBase: FC<AppBaseProps> = ({
  children,
  AuthErrorComponent,
  AuthLoadingComponent,
}) => {
  const [authError, setAuthError] = useState<AuthenticationErrorType>({});
  const { provider: authProvider } = useAuthProviderContext();
  const location = useLocation();
  const { authenticationStatus, setAuthenticationStatus } =
    useAuthenticationStatus();
  const { setRole } = useRole();
  const requiredAuthValueContext = useRequiredAuthValueContext();

  const handleAuthError = useCallback(
    async (error: any) => {
      setAuthenticationStatus('NOT_CONNECTED');
      authProvider
        .checkError(error)
        .then(() => {
          setAuthError({ authError: { error } });
        })
        .catch(() => {
          authProvider
            .signout()
            .then(() => {
              setAuthError({ authError: { error } });
            })
            .catch((error) => {
              setAuthError({ unknownError: { error } });
            });
        });
    },
    [authProvider, setAuthError]
  );

  const handleAuthSuccess = useCallback(
    async (data: any) => {
      setAuthenticationStatus('CONNECTED');

      if (!authProvider.getRole) {
        return;
      }

      authProvider
        .getRole(data)
        .then((role) => {
          setRole(role);
        })
        .catch((error) => {
          setAuthError({ unknownError: { data, error } });
        });
    },
    [authProvider, setAuthError]
  );

  useEffect(() => {
    authProvider.checkAuth().then(handleAuthSuccess).catch(handleAuthError);
  }, [location, handleAuthSuccess, handleAuthError]);

  if (authenticationStatus === 'UNKNOWN') {
    return <AuthLoadingComponent />;
  }

  if (
    requiredAuthValueContext?.requireAuth &&
    (authError.authError?.error || authError.unknownError?.error)
  ) {
    return <AuthErrorComponent {...authError} />;
  }

  return <Routes>{children}</Routes>;
};
