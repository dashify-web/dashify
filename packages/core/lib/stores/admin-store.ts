import { create } from 'zustand';

export type AdminStoreType = {
  title: string;
  pageTitle: string;
  setTitle: (title: string) => void;
  setPageTitle: (pageTitle: string) => void;
};

export const useAdminStore = create<AdminStoreType>((set) => ({
  title: '',
  pageTitle: '',
  setTitle: (title) => set({ title }),
  setPageTitle: (pageTitle) => set({ pageTitle }),
}));
