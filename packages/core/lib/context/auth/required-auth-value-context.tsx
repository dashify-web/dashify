import React, { createContext, ReactNode } from 'react';
import { Nullable } from '@dashify/utils';
import { useRequiredAuthentication, useRequiredRole } from '../../hooks';

export type RequiredAuthValueContextType<Role = any> = {
  requireAuth: boolean;
  requireRole?: Role;
};

export type RequiredAuthValueContextProps<Role = any> =
  RequiredAuthValueContextType<Role> & {
    children: ReactNode;
  };

export const REQUIRED_AUTH_VALUE_CONTEXT =
  createContext<Nullable<RequiredAuthValueContextType>>(null);

export const RequiredAuthValueContext = <Role = any,>({
  children,
  requireRole,
  requireAuth,
}: RequiredAuthValueContextProps<Role>) => {
  useRequiredAuthentication({
    requireAuth,
    onError: () => {
      window.location.href = '/login'; // TODO
    },
  });

  useRequiredRole({
    role: requireRole,
    onError: () => {
      window.location.href = '/login'; // TODO
    },
  });

  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider value={{ requireAuth, requireRole }}>
      {children}
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};
