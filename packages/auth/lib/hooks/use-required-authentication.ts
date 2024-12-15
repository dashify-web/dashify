import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnAuthErrorType } from '../types';
import { useAuthenticationStatus } from './use-authentication-status';
import { useAuthProviderContext } from './use-auth-provider-context';
import { useRole } from './use-role';

export type UseRequiredAuthenticationArgs<Role = any> =
  | {
      requireAuth?: true;
      requiredRoles?: Role[];
      onError?: OnAuthErrorType;
    }
  | {
      requireAuth?: false;
      onError?: never;
      requiredRoles?: never;
    };

export const useRequiredAuthentication = <Role = any>({
  requiredRoles = [],
  requireAuth = true,
  onError,
}: UseRequiredAuthenticationArgs<Role>) => {
  const { authenticationStatus } = useAuthenticationStatus();
  const { provider: authProvider } = useAuthProviderContext();
  const { role: candidateRole } = useRole<Role>();
  const onAuthError = onError ?? authProvider.onError.bind(authProvider);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (requireAuth && authenticationStatus !== 'CONNECTED') {
      onAuthError({
        errorType: 'AUTHENTICATION_ERROR',
        isExplicitlyRequired: true,
        navigate,
      });
    }
  }, [onError, requireAuth, authenticationStatus, navigate]);

  useLayoutEffect(() => {
    const checkRole = async () => {
      try {
        await authProvider.compareRole({
          candidateRole,
          requiredRoles: requiredRoles,
        });
      } catch {
        onAuthError({
          errorType: 'ROLE_PERMISSION_ERROR',
          isExplicitlyRequired: true,
          navigate,
        });
      }
    };

    if (authenticationStatus === 'CONNECTED' && requiredRoles) {
      checkRole();
    }
  }, [onError, requireAuth, authenticationStatus, navigate]);
};
