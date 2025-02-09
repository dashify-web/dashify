import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export type WithAuthRoutesProps = {
  children: ReactNode;
  requireRoles?: any[];
};

export const WithAuthRoutes: FC<WithAuthRoutesProps> = ({
  children,
  requireRoles,
}) => {
  return (
    <RequiredAuthValueContext requireAuth requireRoles={requireRoles}>
      <Routes>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
