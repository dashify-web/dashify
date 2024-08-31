import { useAuthStore } from '../../stores';

export const useUserCredentials = <UserCredentials = any>() => {
  const userCredentials = useAuthStore<UserCredentials>(
    (authStore) => authStore.userCredentials
  );
  const setUserCredentials = useAuthStore<UserCredentials>(
    (authStore) => authStore.setUserCredentials
  );

  return {
    userCredentials,
    setUserCredentials,
  };
};
