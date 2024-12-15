import { AuthProvider } from '@dashify/auth';
import { UserDetails, SignupData, SigninData, Role } from './types';
import { ADMIN_MOCKS, CUSTOMER_MOCKS } from './users';
import axios, { AxiosError } from 'axios';

const verifyUsernameAndPassword = ({
  password,
  username,
}: {
  username: string;
  password: string;
}) => {
  const customer = CUSTOMER_MOCKS.find(
    (customer) =>
      customer.username === username && customer.password === password
  );
  const admin = ADMIN_MOCKS.find(
    (admin) => admin.username === username && admin.password === password
  );

  if (!customer && !admin) {
    return Promise.reject(new Error('(Signin | Signup) Failed'));
  }

  return Promise.resolve();
};

export const TOKEN_SEPARATOR = '--';

export const TOKEN_CACHE_NAME = 'token';
export const authProvider: AuthProvider<
  UserDetails,
  SigninData,
  SignupData,
  Role
> = {
  signin: async (signinData) => {
    return verifyUsernameAndPassword(signinData);
  },
  signup: async (signupData) => {
    return verifyUsernameAndPassword(signupData);
  },
  checkAuth: async () => {
    return axios
      .get<UserDetails>('http://dummy.com/whoami')
      .then((response) => response.data);
  },
  checkError: (error) => {
    if (!(error instanceof AxiosError)) {
      return Promise.resolve();
    }
    if (error.status! === 403) {
      return Promise.reject();
    }
    return Promise.resolve();
  },
  onError: ({ errorType, isExplicitlyRequired, navigate }) => {
    if (errorType === 'AUTHENTICATION_ERROR' && isExplicitlyRequired) {
      navigate('/auth-error');
      return;
    }

    if (errorType === 'ROLE_PERMISSION_ERROR' && isExplicitlyRequired) {
      navigate('/role-error');
      return;
    }

    if (errorType === 'UNKNOWN_ERROR') {
      navigate('/unknown-error');
    }

    return;
  },
  signout: () => Promise.resolve(localStorage.setItem(TOKEN_CACHE_NAME, '')),
  getRole: (useDetails) => {
    return Promise.resolve(useDetails.role);
  },
  compareRole: ({ requiredRoles, candidateRole }) => {
    if (requiredRoles.includes(candidateRole)) {
      return Promise.resolve();
    }
    return Promise.reject();
  },
};
