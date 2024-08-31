import { useLayoutEffect } from 'react';
import { useAuthProviderContext } from './use-auth-provider-context';
import { useRole } from './use-role';
import { AuthErrorType, OnErrorType } from '../../types';

export type UseRequiredRoleArgs<Role = any> = {
  role: Role;
  onError?: OnErrorType;
};

export const useRequiredRole = <Role = any>({
  role,
  onError,
}: UseRequiredRoleArgs<Role>) => {
  const { provider: authProvider } = useAuthProviderContext();
  const { role: candidateRole } = useRole();

  useLayoutEffect(() => {
    const checkAuth = async () => {
      await authProvider.compareRole({ candidateRole, role }).catch(() => {
        onError
          ? onError({
              erroType: AuthErrorType.ROLE_PERMISSION_ERROR,
              isRequired: true,
            })
          : authProvider.onError({
              erroType: AuthErrorType.ROLE_PERMISSION_ERROR,
              isRequired: true,
            });
      });
    };

    checkAuth();
  }, [onError, role, candidateRole]);
};
