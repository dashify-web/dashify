import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export type WithAuthRoutesProps = {
  children: ReactNode;
  requireRoles?: any[];
  noLayout?: boolean;
};

export const WithAuthRoutes: FC<WithAuthRoutesProps> = ({
  noLayout,
  children,
  requireRoles,
}) => {
  return (
    <RequiredAuthValueContext requireAuth requiredRoles={requireRoles}>
      <Routes noLayout={noLayout}>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
