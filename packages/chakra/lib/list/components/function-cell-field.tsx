import React, { FC, ReactNode } from 'react';
import { Table } from '@chakra-ui/react';
import { ResourceType } from '@dashify/provider';
import { useResource } from '@dashify/core';
import { CellFieldProps } from '../types';

export type FunctionCellFieldProps = Omit<
  CellFieldProps,
  'source' | 'emptyValue'
> & {
  render: <Resource extends ResourceType>(resource: Resource) => ReactNode;
};

export const FunctionCellField: FC<FunctionCellFieldProps> = ({
  render,
  ...cellProps
}) => {
  const resource = useResource();
  return <Table.Cell {...cellProps}>{render(resource)}</Table.Cell>;
};
