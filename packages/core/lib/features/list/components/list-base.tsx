import React, { FC, ReactNode } from 'react';
import { ListContext, Pagination, UseGetListArgsType } from '@dashify/provider';
import { ResourceNameContext } from '../../../context';
import { useResourceName } from '../../../hooks';

export type ListBaseProps = {
  resource?: string;
  children?: ReactNode;
  defaultFilters?: any;
  defaultPagination?: Pagination;
} & Omit<UseGetListArgsType, 'pagination' | 'resource' | 'params'>;

export const ListBase: FC<ListBaseProps> = (props) => {
  const { children, resource, ...listContextProps } = props;
  const resourceName = useResourceName();

  return (
    <ResourceNameContext resource={resource ?? resourceName}>
      <ListContext {...listContextProps} resource={resource ?? resourceName}>
        {children}
      </ListContext>
    </ResourceNameContext>
  );
};
