import { useContext } from 'react';
import { ResourceContextType, RESOURCE_CONTEXT } from '../context';
import { ResourceType } from '@dashify/provider';

export const useResource = <T extends ResourceType>() => {
  const resource = useContext<ResourceContextType<T> | null>(RESOURCE_CONTEXT);

  if (resource === null) {
    throw new Error('useResource must be wrapped by ResourceContext');
  }

  return resource;
};
