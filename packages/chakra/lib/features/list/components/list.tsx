import React, { FC, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import { HStack, Table } from '@chakra-ui/react';
import {
  ListBase as CoreList,
  ListBaseProps as CoreListProps,
  ResourceContext,
  useResourceName,
  useResourceRedirect,
  useRetrieveLabels,
} from '@dashify/core';
import { ResourceType, usePagination, useListContext } from '@dashify/provider';
import { Skeleton } from '../../../chakra/snippets/skeleton';
import {
  PaginationItems,
  PaginationRoot,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '../../../chakra/snippets/pagination';

export type ListProps = CoreListProps & {
  rowClick?:
    | (<Resource extends ResourceType>(resource: Resource) => void)
    | false;
  components?: {
    header?: ReactNode;
    headerRow?: ReactNode;
  };
  componentProps?: {
    root?: Table.RootProps;
    body?: Table.BodyProps;
    header?: Table.HeaderProps;
    bodyRow?: Table.RowProps;
    headerRow?: Table.RowProps;
  };
};

const ListContent: FC<ListProps> = ({
  children,
  components,
  componentProps,
  rowClick,
}) => {
  const { data = [], isLoading } = useListContext();
  const { doNextPage, doPrevPage, pagination } = usePagination();
  const labels = useRetrieveLabels(children);
  const resourceName = useResourceName();
  const redirect = useResourceRedirect();

  const redirectToShow = <Resource extends ResourceType>(
    resource: Resource
  ) => {
    redirect({
      resource: resourceName,
      id: resource?.id,
      view: 'show',
    });
  };

  const clickHandler =
    <Resource extends ResourceType>(resource: Resource) =>
    () => {
      if (rowClick === false) {
        return undefined;
      }
      return () => (rowClick ? rowClick(resource) : redirectToShow(resource));
    };

  return (
    <>
      <Table.Root
        variant="outline"
        stickyHeader
        interactive={rowClick !== false}
        {...(componentProps?.root || {})}
      >
        {components?.headerRow ? (
          components?.headerRow
        ) : (
          <Table.Header>
            {components?.headerRow ? (
              components?.headerRow
            ) : (
              <Table.Row {...(componentProps?.headerRow || {})}>
                {labels.map((label) => (
                  <Table.ColumnHeader fontWeight="bold" key={uuid()}>
                    {label}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            )}
          </Table.Header>
        )}
        <Table.Body {...(componentProps?.body || {})}>
          {isLoading && (
            <Table.Row>
              {labels.map(() => (
                <Table.Cell key={uuid()}>
                  <Skeleton height="20px" variant="pulse" width={'100px'} />
                </Table.Cell>
              ))}
            </Table.Row>
          )}
          {!isLoading &&
            data.map((item) => (
              <ResourceContext resource={item}>
                <Table.Row
                  key={item.id}
                  _hover={{
                    cursor: 'pointer',
                  }}
                  onClick={clickHandler(item)}
                  {...(componentProps?.bodyRow || {})}
                >
                  {children}
                </Table.Row>
              </ResourceContext>
            ))}
        </Table.Body>
      </Table.Root>
      <PaginationRoot
        count={50} //FIXME: Update @dashify/provider to get this
        page={pagination?.page}
        pageSize={pagination?.pageSize}
      >
        <HStack wrap="wrap">
          <PaginationPrevTrigger disabled onClick={doPrevPage} />
          <PaginationItems />
          <PaginationNextTrigger onClick={doNextPage} />
        </HStack>
      </PaginationRoot>
    </>
  );
};

export const List: FC<ListProps> = ({
  components,
  componentProps,
  children,
  ...coreProps
}) => {
  return (
    <CoreList {...coreProps}>
      <ListContent components={components} componentProps={componentProps}>
        {children}
      </ListContent>
    </CoreList>
  );
};
