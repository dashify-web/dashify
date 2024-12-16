import React, { FC } from 'react';
import { Table } from '@chakra-ui/react';
import { useResourceFieldValue } from '@dashify/core';
import { CellFieldProps } from '../types';

export type TextCellFieldProps = CellFieldProps;
export const TextCellField: FC<TextCellFieldProps> = ({
  source,
  emptyValue,
  ...cellProps
}) => {
  const value = useResourceFieldValue<any>({ source, emptyValue }) as string;

  return <Table.Cell {...cellProps}>{value}</Table.Cell>;
};
