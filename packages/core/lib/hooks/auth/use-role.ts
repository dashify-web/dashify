import { useAuthStore } from '../../stores';

export const useRole = <Role = any>() => {
  const role = useAuthStore<any, Role>((authStore) => authStore.role);
  const setRole = useAuthStore<any, Role>((authStore) => authStore.setRole);

  return {
    role,
    setRole,
  };
};
