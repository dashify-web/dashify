import React, {
  ComponentType,
  FC,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { AuthProviderContext, REQUIRED_AUTH_VALUE_CONTEXT } from '../context';
import { AuthProvider } from '../types';
import { ClientConfigurer, ClientConfigurerProps } from './client-configurer';
import { useAuthProviderContext, useAuthenticationStatus } from '../hooks';
import { useAuthStore } from '../stores';

export type AuthAppProps = {
  requireAuth?: boolean;
  children: ReactNode;
  authProvider: AuthProvider<any>;
  AuthLoadingComponent: ComponentType;
  clientConfigurer?: ClientConfigurerProps['configure'];
};

type AuthAppBaseProps = Required<
  Pick<AuthAppProps, 'AuthLoadingComponent' | 'children'>
> &
  Pick<AuthAppProps, 'clientConfigurer'>;

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

const AuthAppBase: FC<AuthAppBaseProps> = ({
  children,
  AuthLoadingComponent,
  clientConfigurer,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { provider: authProvider } = useAuthProviderContext();
  const setRole = useAuthStore((authStore) => authStore.setRole);
  const setUserCredentials = useAuthStore(
    (authStore) => authStore.setUserCredentials
  );
  const setAuthenticationStatus = useAuthStore(
    (authStore) => authStore.setAuthenticationStatus
  );
  const { onError } = authProvider;

  const handleAuthError = useCallback(
    async (baseError: any) => {
      setAuthenticationStatus('NOT_CONNECTED');
      try {
        await authProvider.checkError(baseError);
        onError({
          errorType: 'UNKNOWN_ERROR',
          isExplicitlyRequired: false,
          navigate,
        });
      } catch {
        try {
          await authProvider.signout();
          onError({
            errorType: 'AUTHENTICATION_ERROR',
            isExplicitlyRequired: false,
            navigate,
          });
        } catch {
          onError({
            errorType: 'UNKNOWN_ERROR',
            isExplicitlyRequired: false,
            navigate,
          });
        }
      }
    },
    [authProvider, onError, navigate, setRole, setAuthenticationStatus]
  );

  const handleAuthSuccess = useCallback(
    async (userCredentials: any) => {
      setAuthenticationStatus('CONNECTED');
      setUserCredentials(userCredentials);

      if (!authProvider.getRole) {
        return;
      }

      try {
        const role = await authProvider.getRole(userCredentials);
        setRole(role);
      } catch {
        onError({
          errorType: 'UNKNOWN_ERROR',
          isExplicitlyRequired: false,
          navigate,
        });
      }
    },
    [
      authProvider,
      onError,
      navigate,
      setRole,
      setAuthenticationStatus,
      setUserCredentials,
    ]
  );

  useEffect(() => {
    const doCheckAuth = async () => {
      try {
        const response = await authProvider.checkAuth();
        handleAuthSuccess(response);
      } catch (error) {
        handleAuthError(error);
      }
    };
    doCheckAuth();
  }, [location, handleAuthSuccess, handleAuthError]);

  return (
    <AuthAppContent
      handleAuthError={handleAuthError}
      clientConfigurer={clientConfigurer}
      AuthLoadingComponent={AuthLoadingComponent}
    >
      {children}
    </AuthAppContent>
  );
};

const AuthAppContent: FC<
  AuthAppBaseProps & Pick<ClientConfigurerProps, 'handleAuthError'>
> = ({ children, handleAuthError, clientConfigurer, AuthLoadingComponent }) => {
  const { authenticationStatus } = useAuthenticationStatus();

  if (authenticationStatus === 'UNKNOWN') {
    return <AuthLoadingComponent />;
  }

  return clientConfigurer ? (
    <ClientConfigurer
      configure={clientConfigurer}
      handleAuthError={handleAuthError}
      AuthLoadingComponent={AuthLoadingComponent}
    >
      {children}
    </ClientConfigurer>
  ) : (
    children
  );
};
