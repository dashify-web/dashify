import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';
import { Routes } from './routes';

export type NoAuthRoutesProps = { children: ReactNode; noLayout?: boolean };

export const NoAuthRoutes: FC<NoAuthRoutesProps> = ({ children, noLayout }) => {
  return (
    <RequiredAuthValueContext requireAuth={false}>
      <Routes noLayout={noLayout}>{children}</Routes>
    </RequiredAuthValueContext>
  );
};
