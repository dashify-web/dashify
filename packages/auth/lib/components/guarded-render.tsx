import { FC, PropsWithChildren } from 'react';
import { AuthenticationStatus } from '../types';
import { useAuthenticationStatus, useRole } from '../hooks';

export type GuardedRenderProps = PropsWithChildren<{
  roles?: any[];
  status?: AuthenticationStatus[];
}>;

export const GuardedRender: FC<GuardedRenderProps> = ({
  status,
  roles,
  children,
}) => {
  const { role } = useRole();
  const { authenticationStatus } = useAuthenticationStatus();

  if (status && !status.includes(authenticationStatus)) {
    return null;
  }

  if (roles && !roles.includes(role)) {
    return null;
  }

  return children;
};
