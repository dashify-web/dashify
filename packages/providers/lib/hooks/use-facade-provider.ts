import { useContext } from 'react';
import { undefinedContextMessage } from '@dashify/utils';

import { FacadeProvider } from '../types';
import { PROVIDER_CONTEXT } from '../context';

export const useFacadeProvider = () => {
  const facadeProvider = useContext<FacadeProvider | null>(PROVIDER_CONTEXT);

  if (facadeProvider == null) {
    throw new Error(
      undefinedContextMessage('useFacadeProvider', 'ProviderContext')
    );
  }

  return facadeProvider;
};
