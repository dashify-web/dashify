import { useLayoutEffect } from 'react';
import { useAuthenticationStatus } from './use-authentication-status';
import { AuthenticationStatus, AuthErrorType, OnErrorType } from '../../types';
import { useAuthProviderContext } from './use-auth-provider-context';

export type UseRequiredAuthenticationArgs = {
  requireAuth?: boolean;
  onError?: OnErrorType;
};
export const useRequiredAuthentication = ({
  requireAuth = true,
  onError,
}: UseRequiredAuthenticationArgs) => {
  const { authenticationStatus } = useAuthenticationStatus();
  const { provider: authProvider } = useAuthProviderContext();

  useLayoutEffect(() => {
    if (
      requireAuth &&
      authenticationStatus !== AuthenticationStatus.CONNECTED
    ) {
      onError
        ? onError({
            erroType: AuthErrorType.AUTHENTICATION_ERROR,
            isRequired: true,
          })
        : authProvider.onError({
            erroType: AuthErrorType.AUTHENTICATION_ERROR,
            isRequired: true,
          });
    }
  }, [onError, requireAuth, authenticationStatus]);
};
