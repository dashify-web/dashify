import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnErrorType } from '../../types';
import { useAuthProviderContext } from './use-auth-provider-context';
import { useRole } from './use-role';
import { useAuthenticationStatus } from './use-authentication-status';

export type UseRequiredRoleArgs<Role = any> = {
  requiredRole?: Role;
  onError?: OnErrorType;
};

export const useRequiredRole = <Role = any>({
  requiredRole,
  onError,
}: UseRequiredRoleArgs<Role>) => {
  const { authenticationStatus } = useAuthenticationStatus();
  const { provider: authProvider } = useAuthProviderContext();
  const { role: candidateRole } = useRole<Role>();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const checkRole = async () => {
      await authProvider
        .compareRole({ candidateRole, requiredRole })
        .catch(() => {
          if (onError) {
            onError({
              errorType: 'ROLE_PERMISSION_ERROR',
              isRequired: true,
              navigate,
            });
            return;
          }
          authProvider.onError({
            errorType: 'ROLE_PERMISSION_ERROR',
            isRequired: true,
            navigate,
          });
        });
    };

    if (
      requiredRole !== undefined &&
      requiredRole !== null &&
      authenticationStatus === 'CONNECTED'
    ) {
      checkRole();
    }
  }, [onError, requiredRole, candidateRole, navigate, authenticationStatus]);
};
