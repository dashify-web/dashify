import React, { ReactNode } from 'react';
import {
  ListContext,
  Pagination,
  ResourceType,
  UseGetListArgsType,
} from '@dashify/provider';
import { HocComponentType } from '../../types';
import { useResourceName } from '../../../hooks';
import { ResourceNameContext } from '../../../context';

type FeatureProps = {
  defaultFilters?: any;
  defaultPagination?: Pagination;
  resource?: string;
  children?: ReactNode;
} & Omit<UseGetListArgsType, 'pagination' | 'resource' | 'params'>;

export type ListProps<ComponentProps> = ComponentProps & FeatureProps;

export type HocListComponentType<ComponentProps> = HocComponentType<
  ListProps<ComponentProps>,
  FeatureProps
>;

export const withListFeatures = <ComponentProps,>(
  List: HocListComponentType<ComponentProps>
) => {
  return <
    Resource extends ResourceType = any,
    Meta = any,
    Params = any,
    Error = any,
  >({
    resource,
    defaultPagination,
    defaultFilters,
    useQueryOptions,
    sorts,
    meta,
    children,
    ...componentProps
  }: ListProps<ComponentProps>) => {
    const resourceName = useResourceName();

    return (
      <ResourceNameContext resource={resource ?? resourceName}>
        <ListContext<Resource, Meta, Params, Error>
          sorts={sorts}
          params={defaultFilters}
          pagination={defaultPagination}
          resource={resource ?? resourceName}
          useQueryOptions={useQueryOptions}
          meta={meta}
        >
          <List {...componentProps}>{children}</List>
        </ListContext>
      </ResourceNameContext>
    );
  };
};
