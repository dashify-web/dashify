import React, {
  FC,
  ComponentType,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { AuthProvider } from '../types';
import { useAuthProviderContext } from '../hooks';
import { HandleAuthErrorType } from './auth-app';

export type ClientConfigurerProps = PropsWithChildren<{
  AuthLoadingComponent: ComponentType;
  handleAuthError: HandleAuthErrorType;
  configure: (
    handleAuthError: (baseError: any) => Promise<void>,
    authProvider: AuthProvider
  ) => Promise<void>;
}>;

export const ClientConfigurer: FC<ClientConfigurerProps> = ({
  handleAuthError,
  children,
  configure,
  AuthLoadingComponent,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { provider: authProvider } = useAuthProviderContext();

  useEffect(() => {
    const doConfigure = async () => {
      try {
        await configure(
          async (error) =>
            handleAuthError({
              baseError: error,
              makeUnknownErrorRequired: false,
              makeAuthAndRoleErrorRequired: true,
            }),
          authProvider
        );
      } finally {
        setIsLoading(false);
      }
    };

    doConfigure();
  }, []);

  return isLoading ? <AuthLoadingComponent /> : children;
};
