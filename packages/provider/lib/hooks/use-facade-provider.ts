import { useContext } from 'react';
import { PROVIDER_CONTEXT } from '../context';

export const useFacadeProvider = () => {
  const facadeProvider = useContext(PROVIDER_CONTEXT);

  if (facadeProvider === null) {
    throw new Error('useFacadeProvider must be wrapped by ProviderContext');
  }

  return facadeProvider;
};
