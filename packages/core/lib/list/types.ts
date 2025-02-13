import { ResourceType } from '@dashify/provider';

export type RowClick =
  | (<Resource extends ResourceType>(resource: Resource) => void)
  | false;
