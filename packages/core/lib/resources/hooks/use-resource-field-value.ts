import { getObjValue } from '../../utils/get-obj-value';
import { useResource } from './use-resource';

export type UseResourceFieldValueArgs<Resource> = {
  source: keyof Resource;
  emptyValue?: string;
};
export const useResourceFieldValue = <Resource>(
  args: UseResourceFieldValueArgs<Resource>
) => {
  const { source, emptyValue } = args;
  const resource = useResource();
  return getObjValue(resource, source as string) || emptyValue;
};
