import { ResourceType } from '../../types';
import { useListContext } from './use-list-context';

export const useListController = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>() => {
  const response = useListContext<T, Meta, Params, Error>();
  return response.controller;
};
