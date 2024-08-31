import { useAuthStore } from '../../stores';

export const useAuthenticationStatus = () => {
  const authenticationStatus = useAuthStore(
    (authStore) => authStore.authenticationStatus
  );
  const setAuthenticationStatus = useAuthStore(
    (authStore) => authStore.setAuthenticationStatus
  );
  return { authenticationStatus, setAuthenticationStatus };
};
