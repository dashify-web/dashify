import { useLayoutEffect } from 'react';
import { useAuthProviderContext } from './use-auth-provider-context';
import { useRole } from './use-role';

export type UseRequiredRoleArgs<Role = any> = {
  role: Role;
  onError: () => void;
};

export const useRequiredRole = <Role = any>({
  role,
  onError,
}: UseRequiredRoleArgs<Role>) => {
  const authProvider = useAuthProviderContext();
  const { role: candidateRole } = useRole();

  useLayoutEffect(() => {
    if (!authProvider.provider.checkRole(candidateRole, role)) {
      onError();
    }
  }, [onError, role, candidateRole]);
};
