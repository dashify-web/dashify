import React, { createContext, ReactNode, useState } from 'react';
import {
  ResourceType,
  UseGetListArgsType,
  useGetList,
} from '@dashify/providers';
import { UseQueryResult } from '@tanstack/react-query';
import { Nullable } from '@dashify/utils';

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
  controller: (
    args: Partial<ListControllerType<T, Meta, Params, Error>>
  ) => void;
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

  //WARNING : refech or queryKey ?
  const setter: ListContextType<T, Meta, Params, Error>['controller'] = (
    args
  ) => {
    setQueryOptions((prev) => ({ ...prev, ...args }));
    response.refetch();
  };

  return (
    <LIST_CONTEXT.Provider value={{ ...response, controller: setter }}>
      {children}
    </LIST_CONTEXT.Provider>
  );
};
