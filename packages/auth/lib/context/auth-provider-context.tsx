import React, { createContext, ReactNode, FC, ComponentType } from 'react';
import { AuthProvider } from '../types';

export type AuthProviderContextType<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
> = {
  provider: AuthProvider<UserCredentials, SigninData, SignupData, Role>;
  Layout: ComponentType<{ children: ReactNode }>;
};

export const AUTH_PROVIDER_CONTEXT =
  createContext<AuthProviderContextType | null>(null);

export type AuthProviderContextProps = AuthProviderContextType & {
  children: ReactNode;
};

export const AuthProviderContext: FC<AuthProviderContextProps> = ({
  children,
  provider,
  Layout,
}) => {
  return (
    <AUTH_PROVIDER_CONTEXT.Provider value={{ provider, Layout }}>
      {children}
    </AUTH_PROVIDER_CONTEXT.Provider>
  );
};
