import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';

export const NoAuthRoutes: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RequiredAuthValueContext requireAuth={false}>
      {children}
    </RequiredAuthValueContext>
  );
};
