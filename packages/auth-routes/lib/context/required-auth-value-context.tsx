import React, { createContext, ReactNode } from 'react';
import { Nullable } from '@dashify/utils';
import { useRequiredAuthValueContext } from '../hooks';

export type RequiredAuthValueContextType<Role = any> = {
  requireAuth?: boolean;
  requireRoles?: Role[];
};

export type RequiredAuthValueContextProps<Role = any> =
  RequiredAuthValueContextType<Role> & {
    children: ReactNode;
  };

export const REQUIRED_AUTH_VALUE_CONTEXT =
  createContext<Nullable<RequiredAuthValueContextType>>(null);

export const RequiredAuthValueContext = <Role = any,>({
  children,
  requireRoles,
  requireAuth,
}: RequiredAuthValueContextProps<Role>) => {
  const { requireAuth: inheritRequireAuth, requireRoles: inheritRequireRole } =
    useRequiredAuthValueContext();
  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider
      value={{
        requireAuth: requireAuth ?? inheritRequireAuth,
        requireRoles: requireRoles ?? inheritRequireRole,
      }}
    >
      {children}
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};
