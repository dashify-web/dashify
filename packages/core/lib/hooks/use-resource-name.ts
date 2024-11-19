import { useContext } from 'react';
import { RESOURCE_NAME_CONTEXT } from '../context';

const NULL_RESOURCE_NAME_VALUE = 'NULL_RESOURCE_NAME_VALUE';
export const useResourceName = () => {
  const resourceName = useContext(RESOURCE_NAME_CONTEXT);

  return resourceName ?? NULL_RESOURCE_NAME_VALUE;
};
