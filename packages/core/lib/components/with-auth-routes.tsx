import React, { FC, ReactNode } from 'react';
import { RequiredAuthValueContext } from '../context';

export const WithAuthRoutes: FC<{ children: ReactNode; requireRole?: any }> = ({
  children,
  requireRole,
}) => {
  return (
    <RequiredAuthValueContext requireAuth={true} requireRole={requireRole}>
      {children}
    </RequiredAuthValueContext>
  );
};
