import { create } from 'zustand';
import { AuthenticationStatus } from '../types';

export type AuthStoreType<UserCredentials = any, Role = any> = {
  role: Role;
  authenticationStatus: AuthenticationStatus;
  userCredentials: UserCredentials;
  setRole: (data: Role) => void;
  setUserCredentials: (userCredentials: UserCredentials) => void;
  setAuthenticationStatus: (authenticationStatus: AuthenticationStatus) => void;
  setAuthStore: (authStore: Partial<AuthStoreType<UserCredentials>>) => void;
};

const useAuthStoreBase = create<AuthStoreType>((set) => ({
  role: null,
  userCredentials: null,
  authenticationStatus: 'UNKNOWN',
  setRole: (role) => set({ role }),
  setUserCredentials: (userCredentials) => set({ userCredentials }),
  setAuthenticationStatus: (authenticationStatus) =>
    set({ authenticationStatus }),
  setAuthStore: (authStore) => set(authStore),
}));

export const useAuthStore = <UserCredentials = any, Role = any, Slice = any>(
  selector: (state: AuthStoreType<UserCredentials, Role>) => Slice
) => useAuthStoreBase(selector);
