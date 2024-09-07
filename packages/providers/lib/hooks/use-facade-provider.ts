import { useContext } from 'react';
import { FacadeProvider } from '../types';
import { PROVIDER_CONTEXT } from '../context';

export const useFacadeProvider = () => {
  const facadeProvider = useContext<FacadeProvider | null>(PROVIDER_CONTEXT);

  if (facadeProvider == null) {
    throw new Error('useFacadeProvider must be wrapped by ProviderContext');
  }

  return facadeProvider;
};
