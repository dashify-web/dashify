import { useContext } from 'react';
import { AUTH_PROVIDER_CONTEXT, AuthProviderContextType } from '../context';

export const useAuthProviderContext = <
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
>() => {
  const response = useContext<AuthProviderContextType<
    UserCredentials,
    SigninData,
    SignupData,
    Role
  > | null>(AUTH_PROVIDER_CONTEXT);

  if (response === null) {
    throw new Error(
      'useAuthProviderContext must be wrapped by AuthProviderContext'
    );
  }

  return response;
};
