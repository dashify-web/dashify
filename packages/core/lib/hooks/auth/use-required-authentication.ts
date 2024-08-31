import { useLayoutEffect } from 'react';
import { useAuthenticationStatus } from './use-authentication-status';

export type UseRequiredAuthenticationArgs = {
  requireAuth?: boolean;
  onError: () => void;
};
export const useRequiredAuthentication = ({
  requireAuth = true,
  onError,
}: UseRequiredAuthenticationArgs) => {
  const { authenticationStatus } = useAuthenticationStatus();

  useLayoutEffect(() => {
    if (requireAuth && authenticationStatus !== 'CONNECTED') {
      onError();
    }
  }, [onError, requireAuth, authenticationStatus]);
};
