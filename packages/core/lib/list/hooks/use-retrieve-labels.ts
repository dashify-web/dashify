import { ReactNode } from 'react';
import { CommonFieldProps } from '../../types';
import { mapReactChildrens } from '../../utils/react-tools';

export const useRetrieveLabels = (children: ReactNode) => {
  return mapReactChildrens<CommonFieldProps, string>(
    children,
    (child) => child.props.label || ''
  );
};
