import React, { createContext, ReactNode } from 'react';

export type RequiredAuthValueContextType<Role = any> = {
  requireAuth: boolean;
  requireRole?: Role;
};

export type RequiredAuthValueContextProps<Role = any> =
  RequiredAuthValueContextType<Role> & {
    children: ReactNode;
  };

export const REQUIRED_AUTH_VALUE_CONTEXT =
  createContext<RequiredAuthValueContextType | null>(null);

export const RequiredAuthValueContext = <Role = any,>({
  children,
  requireRole,
  requireAuth,
}: RequiredAuthValueContextProps<Role>) => {
  return (
    <REQUIRED_AUTH_VALUE_CONTEXT.Provider value={{ requireAuth, requireRole }}>
      {children}
    </REQUIRED_AUTH_VALUE_CONTEXT.Provider>
  );
};
