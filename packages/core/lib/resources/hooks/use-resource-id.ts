import { ResourceType } from '@dashify/provider';
import { useResourceFieldValue } from './use-resource-field-value';

export const useResourceId = () => {
  const id = useResourceFieldValue<ResourceType>({ source: 'id' });
  return id as ResourceType['id'];
};
