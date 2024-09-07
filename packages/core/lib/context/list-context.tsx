import React, { createContext, ReactNode, useEffect, useState } from 'react';
import {
  ResourceType,
  UseGetListArgsType,
  useGetList,
} from '@dashify/providers';
import { UseQueryResult } from '@tanstack/react-query';
import { Nullable, StateSetter } from '@dashify/utils';

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
> = UseQueryResult<T[], Error> &
  ListControllerType<T, Meta, Params, Error> & {
    controller: StateSetter<ListControllerType<T, Meta, Params, Error>>;
  };

export const LIST_CONTEXT = createContext<Nullable<ListContextType<any>>>(null);

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
  useQueryOptions,
  ...useGetListOptions
}: ListContextProps<T, Meta, Params, Error>) => {
  const [queryOptions, setQueryOptions] =
    useState<ListControllerType<T, Meta, Params, Error>>(useGetListOptions);

  const response = useGetList<T, Meta, Params, Error>({
    resource,
    useQueryOptions,
    ...queryOptions,
  });

  useEffect(() => {
    //WARNING : refech or queryKey ?
    response.refetch();
  }, [JSON.stringify(queryOptions)]);

  return (
    <LIST_CONTEXT.Provider
      value={{ ...response, ...queryOptions, controller: setQueryOptions }}
    >
      {children}
    </LIST_CONTEXT.Provider>
  );
};
