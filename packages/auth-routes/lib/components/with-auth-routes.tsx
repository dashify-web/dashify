import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export const WithAuthRoutes: FC<{
  children: ReactNode;
  requireRoles?: any;
}> = ({ children, requireRoles }) => {
  return (
    <RequiredAuthValueContext requireAuth={true} requireRoles={requireRoles}>
      <Routes>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
