import React, { createContext, ReactNode, FC } from 'react';
import { AuthProvider } from '../types';

export type AuthProviderContextType<
  UserCredentials = any,
  SigninData = any,
  SignupData = any,
  Role = any,
> = {
  provider: AuthProvider<UserCredentials, SigninData, SignupData, Role>;
};

export const AUTH_PROVIDER_CONTEXT =
  createContext<AuthProviderContextType | null>(null);

export type AuthProviderContextProps = AuthProviderContextType & {
  children: ReactNode;
};

export const AuthProviderContext: FC<AuthProviderContextProps> = ({
  children,
  provider,
}) => {
  return (
    <AUTH_PROVIDER_CONTEXT.Provider value={{ provider }}>
      {children}
    </AUTH_PROVIDER_CONTEXT.Provider>
  );
};
