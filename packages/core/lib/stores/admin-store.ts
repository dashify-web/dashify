import { create } from 'zustand';

export type AdminStoreType = {
  title: string;
  pageTitle: string;
  isLoading: boolean;
  setTitle: (title: string) => void;
  setPageTitle: (pageTitle: string) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useAdminStore = create<AdminStoreType>((set) => ({
  title: '',
  pageTitle: '',
  isLoading: false,
  setTitle: (title) => set({ title }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setPageTitle: (pageTitle) => set({ pageTitle }),
}));
