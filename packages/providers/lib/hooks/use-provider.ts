import { ResourceType, RequiredResourceName } from '../types';
import { useFacadeProvider } from './use-facade-provider';

export const useProvider = <T extends ResourceType = any>({
  resource,
}: RequiredResourceName) => {
  const facadeProvider = useFacadeProvider();
  return facadeProvider.getProvider<T>({ resource });
};
