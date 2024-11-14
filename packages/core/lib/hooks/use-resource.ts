import { useContext } from 'react';
import { ResourceContextType, RESOURCE_CONTEXT } from '../context';
import { ResourceType } from '@dashify/provider';

export const useResource = <T extends ResourceType>() => {
  const resourceName = useContext<ResourceContextType<T> | null>(
    RESOURCE_CONTEXT
  );

  if (resourceName === null) {
    throw new Error('useResource must be wrapped by ResourceContext');
  }

  return resourceName as ResourceContextType<T>;
};
