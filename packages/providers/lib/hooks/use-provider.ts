import { useContext } from 'react';
import { ResourceType, Provider } from '../types';
import { PROVIDER_CONTEXT } from '../context';

export const useProvider = <T extends ResourceType>() => {
  const provider = useContext<Provider<T> | null>(PROVIDER_CONTEXT);

  if (provider == null) {
    throw new Error('useProvider must be wrapped by ProviderContext');
  }

  return provider;
};
