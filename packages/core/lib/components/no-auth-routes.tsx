import React, { FC, ReactNode } from 'react';
import { Routes } from 'react-router-dom';
import { RequiredAuthValueContext } from '../context';

export const NoAuthRoutes: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <RequiredAuthValueContext requireAuth={false}>
      <Routes>
        {children}
      </Routes>
    </RequiredAuthValueContext>
  );
};
