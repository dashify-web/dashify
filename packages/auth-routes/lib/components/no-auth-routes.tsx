import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export const NoAuthRoutes: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RequiredAuthValueContext requireAuth={false}>
      <Routes>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
