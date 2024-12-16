import { useDashboardStore } from '../stores';

export const useDashboardTitle = () => {
  const title = useDashboardStore((dashboardStore) => dashboardStore.title);
  const setTitle = useDashboardStore(
    (dashboardStore) => dashboardStore.setTitle
  );

  return {
    title,
    setTitle,
  };
};
