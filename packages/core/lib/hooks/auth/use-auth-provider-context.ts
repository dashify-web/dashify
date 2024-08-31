import { useContext } from 'react';
import { Nullable, undefinedContextMessage } from '@dashify/utils';
import { AUTH_PROVIDER_CONTEXT, AuthProviderContextType } from '../../context';

export const useAuthProviderContext = <
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
>() => {
  const response = useContext<
    Nullable<
      AuthProviderContextType<UserCredentials, SigninData, SignupData, Role>
    >
  >(AUTH_PROVIDER_CONTEXT);

  if (response === null) {
    throw new Error(
      undefinedContextMessage('useAuthProviderContext', 'AuthProviderContext')
    );
  }

  return response;
};
