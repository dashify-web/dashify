import React, { FC, ReactNode } from 'react';
import { v4 as uuid } from 'uuid';
import { Table } from '@chakra-ui/react';
import {
  ListBase as CoreList,
  ListBaseProps as CoreListProps,
  ResourceContext,
  useRetrieveLabels,
} from '@dashify/core';
import { useListContext } from '@dashify/provider';

export type ListProps = CoreListProps & { headerRow?: ReactNode, tableRootProps?: Table.RootProps };

const ListContent: FC<Pick<ListProps, "children" | "headerRow" | "tableRootProps">> = ({ children, tableRootProps = {}, headerRow }) => {
  const { data = [], isLoading } = useListContext();
  const labels = useRetrieveLabels(children);

  return (
    <>
      <Table.Root striped {...tableRootProps}>
        <Table.Header>
          <Table.Row>
            {headerRow ? headerRow : labels.map((label) => (
              <Table.ColumnHeader key={uuid()}>{label}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!isLoading && data.map((item) => (
            <ResourceContext resource={item}>
              <Table.Row key={item.id}>
                {children}
              </Table.Row>
            </ResourceContext>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export const List: FC<ListProps> = ({ tableRootProps, headerRow, children, ...props }) => {
  return (
    <CoreList {...props}>
      <ListContent headerRow={headerRow} tableRootProps={tableRootProps}>
        {children}
      </ListContent>
    </CoreList>
  )
}
