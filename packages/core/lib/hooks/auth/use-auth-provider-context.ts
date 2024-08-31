import { useContext } from 'react';
import { undefinedContextMessage } from '@dashify/utils';
import { AUTH_PROVIDER_CONTEXT } from '../../context';

export const useAuthProviderContext = () => {
  const response = useContext(AUTH_PROVIDER_CONTEXT);

  if (response === null) {
    throw new Error(
      undefinedContextMessage('useAuthProviderContext', 'AuthProviderContext')
    );
  }

  return response;
};
