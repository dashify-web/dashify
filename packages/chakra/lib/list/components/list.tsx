import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { HStack, Table } from '@chakra-ui/react';
import {
  ListBase as CoreList,
  ListBaseProps as CoreListProps,
  ResourceContext,
  useRetrieveLabels,
  useRowClickHandler,
} from '@dashify/core';
import { usePagination, useListContext } from '@dashify/provider';
import { Skeleton } from '../../chakra/snippets/skeleton';
import {
  PaginationItems,
  PaginationRoot,
  PaginationNextTrigger,
  PaginationPrevTrigger,
} from '../../chakra/snippets/pagination';

export type ListProps = CoreListProps & {
  componentProps?: {
    root?: Table.RootProps;
    body?: Table.BodyProps;
    header?: Table.HeaderProps;
    bodyRow?: Table.RowProps;
    headerRow?: Table.RowProps;
  };
};

const ListContent: FC<ListProps> = ({ children, rowClick, componentProps }) => {
  const labels = useRetrieveLabels(children);
  const clickHandler = useRowClickHandler({ rowClick });
  const { data = [], isLoading, pageInfosQueryResult } = useListContext();
  const { data: pageInfos = {} } = pageInfosQueryResult;
  const { setPage, doNextPage, doPrevPage, setPageSize, pagination } =
    usePagination();

  return (
    <>
      <Table.Root
        variant="outline"
        stickyHeader
        interactive={rowClick !== false}
        {...(componentProps?.root || {})}
      >
        <Table.Header>
          <Table.Row {...(componentProps?.headerRow || {})}>
            {labels.map((label) => (
              <Table.ColumnHeader fontWeight="bold" key={uuid()}>
                {label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
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
              <ResourceContext key={item.id} resource={item}>
                <Table.Row
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
        count={pageInfos?.total ?? 0}
        page={pagination?.page ?? 1}
        pageSize={pagination?.pageSize ?? 1}
        onPageChange={({ page }) => setPage(page)}
        onPageSizeChange={({ pageSize }) => setPageSize(pageSize)}
      >
        <HStack wrap="wrap">
          <PaginationPrevTrigger
            disabled={!pageInfos.hasPrevPage}
            onClick={doPrevPage}
            data-testid="dashify-list-prev-button"
          />
          <PaginationItems />
          <PaginationNextTrigger
            disabled={!pageInfos.hasNextPage}
            onClick={doNextPage}
            data-testid="dashify-list-next-button"
          />
        </HStack>
      </PaginationRoot>
    </>
  );
};

export const List: FC<ListProps> = ({
  children,
  rowClick,
  componentProps,
  ...coreProps
}) => {
  return (
    <CoreList {...coreProps}>
      <ListContent rowClick={rowClick} componentProps={componentProps}>
        {children}
      </ListContent>
    </CoreList>
  );
};
