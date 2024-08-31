import { useAuthenticationStatus } from './use-authentication-status';

export type UseRequiredAuthenticationArgs =
  | {
      redirect: string;
      onError: never;
    }
  | {
      onError: () => void;
      redirect: never;
    };

export const useRequiredAuthentication = ({
  onError,
  redirect,
}: UseRequiredAuthenticationArgs) => {
  const { authenticationStatus } = useAuthenticationStatus();

  if (authenticationStatus !== 'CONNECTED') {
    if (redirect) {
      return (window.location.href = redirect);
    }
    onError();
  }
};
