import React, { createContext, ReactNode } from 'react';
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
  createContext<RequiredAuthValueContextType | null>(null);

export const RequiredAuthValueContext = <Role = any,>({
  children,
  requireRoles,
  requireAuth,
}: RequiredAuthValueContextProps<Role>) => {
  const { requireAuth: inheritRequireAuth, requireRoles: inheritRequireRoles } =
    useRequiredAuthValueContext();
  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider
      value={{
        requireAuth: requireAuth ?? inheritRequireAuth,
        requireRoles: requireRoles ?? inheritRequireRoles,
      }}
    >
      {children}
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};
