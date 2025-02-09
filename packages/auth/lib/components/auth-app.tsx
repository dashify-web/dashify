import React, {
  FC,
  ComponentType,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { AuthProviderContext, REQUIRED_AUTH_VALUE_CONTEXT } from '../context';
import { AuthProvider } from '../types';
import { ClientConfigurer, ClientConfigurerProps } from './client-configurer';
import { AuthStoreType, useAuthStore } from '../stores';
import { useAuthProviderContext, useAuthenticationStatus } from '../hooks';

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

export type HandleAuthErrorType = (args: {
  makeAuthAndRoleErrorRequired: boolean;
  makeUnknownErrorRequired: boolean;
  baseError: any;
}) => Promise<void>;
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
  const location = useLocation();
  const navigate = useNavigate();
  const setAuthStore = useAuthStore((state) => state.setAuthStore);
  const { provider: authProvider } = useAuthProviderContext();
  const { onError } = authProvider;

  const handleAuthError: HandleAuthErrorType = useCallback(
    //TODO: Refactor
    async ({
      makeUnknownErrorRequired,
      makeAuthAndRoleErrorRequired,
      baseError,
    }) => {
      setAuthStore({ authenticationStatus: 'NOT_CONNECTED' });
      try {
        await authProvider.checkError(baseError);
        onError({
          errorType: 'UNKNOWN_ERROR',
          isExplicitlyRequired: makeUnknownErrorRequired,
          navigate,
        });
      } catch {
        try {
          await authProvider.signout();
          onError({
            errorType: 'AUTHENTICATION_ERROR',
            isExplicitlyRequired: makeAuthAndRoleErrorRequired,
            navigate,
          });
        } catch {
          onError({
            errorType: 'UNKNOWN_ERROR',
            isExplicitlyRequired: makeUnknownErrorRequired,
            navigate,
          });
        }
      }
    },
    [authProvider, onError, navigate, setAuthStore]
  );

  const handleAuthSuccess = useCallback(
    async (userCredentials: any) => {
      const authStoreSuccessValue: Partial<AuthStoreType> = {
        authenticationStatus: 'CONNECTED',
        userCredentials,
      };

      if (authProvider.getRole) {
        try {
          authStoreSuccessValue.role =
            await authProvider.getRole(userCredentials);
        } catch {
          onError({
            errorType: 'UNKNOWN_ERROR',
            isExplicitlyRequired: true,
            navigate,
          });
        }
      }

      setAuthStore(authStoreSuccessValue);
    },
    [authProvider, onError, navigate, setAuthStore]
  );

  useEffect(() => {
    const doCheckAuth = async () => {
      try {
        const response = await authProvider.checkAuth();
        handleAuthSuccess(response);
      } catch (error) {
        handleAuthError({
          makeUnknownErrorRequired: true,
          makeAuthAndRoleErrorRequired: false,
          baseError: error,
        });
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
