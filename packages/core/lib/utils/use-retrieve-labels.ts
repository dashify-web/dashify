import { ReactNode } from 'react';
import { CommonFieldProps } from './field-type';
import { mapReactChildrens } from './react-tools';

export const useRetrieveLabels = (children: ReactNode) => {
  return mapReactChildrens<CommonFieldProps, string>(
    children,
    (child) => child.props.label || ''
  );
};
