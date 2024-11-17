import { useResource } from "./use-resource";

export type UseResourceFieldValueArgs<Resource> = { source: keyof Resource; emptyValue?: keyof Resource };
export const useResourceFieldValue = <Resource>(args: UseResourceFieldValueArgs<Resource>) => {
  const { source, emptyValue } = args;
  const resource = useResource();
  return resource[source as keyof typeof resource] || emptyValue;
}
