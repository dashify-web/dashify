import { useContext } from 'react';
import { ResourceNameContextType, RESOURCE_NAME_CONTEXT } from '../context';

const NULL_RESOURCE_NAME_VALUE = 'NULL_RESOURCE_NAME_VALUE';
export const useResourceName = () => {
  const resourceName = useContext<ResourceNameContextType | null>(
    RESOURCE_NAME_CONTEXT
  );

  return (resourceName ?? NULL_RESOURCE_NAME_VALUE) as ResourceNameContextType;
};
