import { create } from 'zustand';

export type DashboardStoreType = {
  title: string;
  setTitle: (title: string) => void;
};

export const useDashboardStore = create<DashboardStoreType>((set) => ({
  title: '',
  setTitle: (title) => set({ title }),
}));
