import React, { FC, ReactNode } from 'react';
import { ListContext, Pagination, UseGetListArgsType } from '@dashify/provider';
import { ResourceNameContext, useResourceName } from '../../resources';
import { RowClick } from '../types';

export type ListBaseProps = {
  resource?: string;
  children?: ReactNode;
  defaultFilters?: any;
  defaultPagination?: Pagination;
  rowClick?: RowClick;
} & Omit<UseGetListArgsType, 'pagination' | 'resource' | 'params'>;

export const ListBase: FC<ListBaseProps> = (props) => {
  const {
    children,
    resource,
    defaultPagination,
    defaultFilters,
    ...listContextProps
  } = props;
  const resourceName = useResourceName();

  return (
    <ResourceNameContext resource={resource ?? resourceName}>
      <ListContext
        pagination={defaultPagination}
        params={defaultFilters}
        resource={resource ?? resourceName}
        {...listContextProps}
      >
        {children}
      </ListContext>
    </ResourceNameContext>
  );
};
