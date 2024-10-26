import { create } from 'zustand';

export type AppStoreType = {
  title: string;
  setTitle: (title: string) => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}));
