import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { AuthProvider } from '../types';
import { useAuthProviderContext } from '../hooks';

export type ClientConfigurerProps = PropsWithChildren<{
  AuthLoadingComponent: ComponentType;
  handleAuthError: (baseError: any) => Promise<void>;
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
        await configure(handleAuthError, authProvider);
      } finally {
        setIsLoading(false);
      }
    };

    doConfigure();
  }, []);

  return isLoading ? <AuthLoadingComponent /> : children;
};
