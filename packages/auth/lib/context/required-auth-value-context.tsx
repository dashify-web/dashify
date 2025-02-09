import React, { createContext, ReactNode } from 'react';
import { useRequiredAuthValueContext } from '../hooks';

export type RequiredAuthValueContextType<Role = any> = {
  requireAuth?: boolean;
  requiredRoles?: Role[];
};

export type RequiredAuthValueContextProps<Role = any> =
  RequiredAuthValueContextType<Role> & {
    children: ReactNode;
  };

export const REQUIRED_AUTH_VALUE_CONTEXT =
  createContext<RequiredAuthValueContextType | null>(null);

export const RequiredAuthValueContext = <Role = any,>({
  children,
  requiredRoles,
  requireAuth,
}: RequiredAuthValueContextProps<Role>) => {
  const {
    requireAuth: inheritRequireAuth,
    requiredRoles: inheritRequireRoles,
  } = useRequiredAuthValueContext();
  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider
      value={{
        requireAuth: requireAuth ?? inheritRequireAuth,
        requiredRoles: requiredRoles ?? inheritRequireRoles,
      }}
    >
      {children}
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};
