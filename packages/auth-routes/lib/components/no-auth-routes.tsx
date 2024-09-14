import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export type NoAuthRoutesProps = { children: ReactNode };

export const NoAuthRoutes: FC<NoAuthRoutesProps> = ({ children }) => {
  return (
    <RequiredAuthValueContext requireAuth={false}>
      <Routes>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
