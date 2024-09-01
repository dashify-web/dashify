import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export const WithAuthRoutes: FC<{ children: ReactNode; requireRole?: any }> = ({
  children,
  requireRole,
}) => {
  return (
    <RequiredAuthValueContext requireAuth={true} requireRole={requireRole}>
      <Routes>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
