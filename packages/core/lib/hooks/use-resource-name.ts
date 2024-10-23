import { useContext } from 'react';
import { ResourceNameContextType, RESOURCE_NAME_CONTEXT } from '../context';

export const useResourceName = () => {
  const resourceName = useContext<ResourceNameContextType | null>(
    RESOURCE_NAME_CONTEXT
  );

  if (resourceName === null) {
    throw new Error('useResourceName must be wrapped by ResourceNameContext');
  }

  return resourceName;
};
