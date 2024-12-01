import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { PageInfos, ResourceType } from '../types';
import { useGetList, UseGetListArgsType } from '../hooks';

export type ListControllerType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = Omit<
  UseGetListArgsType<T, Meta, Params, Error>,
  'useQueryOptions' | 'resource'
>;
export type ListContextType<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = UseQueryResult<T[], Error> & {
  pageInfosQueryResult: UseQueryResult<PageInfos, Error>;
} & ListControllerType<T, Meta, Params, Error> & {
    controller: Dispatch<
      SetStateAction<ListControllerType<T, Meta, Params, Error>>
    >;
  };

export const LIST_CONTEXT = createContext<ListContextType<any> | null>(null);

export type ListContextProps<
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
> = UseGetListArgsType<T, Meta, Params, Error> & {
  children: ReactNode;
};

export const ListContext = <
  T extends ResourceType = any,
  Meta = any,
  Params = any,
  Error = any,
>({
  children,
  resource,
  useQueryOptions = {},
  ...useGetListOptions
}: ListContextProps<T, Meta, Params, Error>) => {
  const [queryOptions, setQueryOptions] =
    useState<ListControllerType<T, Meta, Params, Error>>(useGetListOptions);
  const { queryKey = [], ...restQueryOptions } = useQueryOptions;

  const response = useGetList<T, Meta, Params, Error>({
    resource,
    useQueryOptions: {
      queryKey: [queryOptions, queryKey],
      ...restQueryOptions,
    },
    ...queryOptions,
  });

  return (
    <LIST_CONTEXT.Provider
      value={{ ...response, ...queryOptions, controller: setQueryOptions }}
    >
      {children}
    </LIST_CONTEXT.Provider>
  );
};
