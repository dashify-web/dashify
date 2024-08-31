import { useRole } from './use-role';

export type UseRequiredRoleArgs<Role = any> =
  | {
      role: Role;
      redirect: string;
      onError: never;
    }
  | {
      role: Role;
      onError: () => void;
      redirect: never;
    };

export const useRequiredRole = <Role = any>({
  role,
  redirect,
  onError,
}: UseRequiredRoleArgs<Role>) => {
  const { role: userConnectedRole } = useRole<Role>();

  if (role !== userConnectedRole) {
    if (redirect) {
      return (window.location.href = redirect);
    }
    onError();
  }
};
