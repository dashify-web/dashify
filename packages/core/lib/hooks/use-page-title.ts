import { useAdminStore } from '../stores';

export const usePageTitle = () => {
  const title = useAdminStore((adminStore) => adminStore.title);
  const setTitle = useAdminStore((adminStore) => adminStore.setTitle);

  return {
    title,
    setTitle,
  };
};
