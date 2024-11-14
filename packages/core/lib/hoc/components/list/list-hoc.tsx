import React, {
  ComponentType,
  forwardRef,
  ReactNode,
  RefAttributes,
} from 'react';
import { ListContext, Pagination, UseGetListArgsType } from '@dashify/provider';
import { useResourceName } from '../../../hooks';
import { ResourceNameContext } from '../../../context';
import { AnyRefElement } from '../../types';

type FeatureProps<RefElementType extends AnyRefElement> = {
  defaultFilters?: any;
  defaultPagination?: Pagination;
  resource?: string;
  children?: ReactNode;
} & Omit<UseGetListArgsType, 'pagination' | 'resource' | 'params'> &
  RefAttributes<RefElementType>;

export type ListProps<
  RefElementType extends AnyRefElement,
  ComponentProps,
> = ComponentProps & FeatureProps<RefElementType>;

export const withListFeatures = <
  RefElementType extends AnyRefElement,
  ComponentProps,
>(
  List: ComponentType<ComponentProps>
) => {
  return forwardRef<RefElementType, ListProps<RefElementType, ComponentProps>>(
    (props, ref) => {
      const {
        resource,
        defaultPagination,
        defaultFilters,
        useQueryOptions,
        sorts,
        meta,
        children,
        ...componentProps
      } = props;
      const resourceName = useResourceName();

      return (
        <ResourceNameContext resource={resource ?? resourceName}>
          <ListContext
            sorts={sorts}
            params={defaultFilters}
            pagination={defaultPagination}
            resource={resource ?? resourceName}
            useQueryOptions={useQueryOptions}
            meta={meta}
          >
            <List ref={ref} {...(componentProps as ComponentProps)}>
              {children}
            </List>
          </ListContext>
        </ResourceNameContext>
      );
    }
  );
};
