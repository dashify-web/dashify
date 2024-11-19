import { CommonFieldProps } from '@dashify/core';
import { Table } from '@chakra-ui/react';

export type CellFieldProps = CommonFieldProps &
  Omit<Table.CellProps, 'children'>;
