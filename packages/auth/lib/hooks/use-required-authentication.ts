import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnErrorType } from '../types';
import { useAuthenticationStatus } from './use-authentication-status';
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
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (requireAuth && authenticationStatus !== 'CONNECTED') {
      if (onError) {
        onError({
          errorType: 'AUTHENTICATION_ERROR',
          isRequired: true,
          navigate,
        });
        return;
      }
      authProvider.onError({
        errorType: 'AUTHENTICATION_ERROR',
        isRequired: true,
        navigate,
      });
    }
  }, [onError, requireAuth, authenticationStatus, navigate]);
};
