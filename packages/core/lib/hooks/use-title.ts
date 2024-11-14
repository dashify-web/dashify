import { useAppStore } from '../stores';

export const useTitle = () => {
  const title = useAppStore((appStore) => appStore.title);
  const setTitle = useAppStore((appStore) => appStore.setTitle);

  return {
    title,
    setTitle,
  };
};
