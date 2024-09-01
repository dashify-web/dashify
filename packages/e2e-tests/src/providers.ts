import { Provider } from '@dashify/providers';
import { Admin, Customer } from './types';
import { ADMIN_MOCKS, CUSTOMER_MOCKS } from './users';

/* adminProvider */
export const adminProvider: Provider<Admin> = {
  resource: 'admins',
  edit: async ({ payload }) => {
    return Promise.resolve(
      ADMIN_MOCKS.find((admin) => payload.id === admin.id)!
    );
  },
  create: async ({ payload }) => {
    return Promise.resolve(
      ADMIN_MOCKS.find((admin) => payload.id === admin.id)!
    );
  },
  getList: async ({ pagination }) => {
    const { page = 1, pageSize = 2 } = pagination || {};
    return Promise.resolve(ADMIN_MOCKS.slice(page - 1, pageSize));
  },
  getById: async ({ id }) => {
    return Promise.resolve(ADMIN_MOCKS.find((admin) => id === admin.id)!);
  },
  deleteOne: async ({ payload }) => {
    return Promise.resolve(
      ADMIN_MOCKS.find((admin) => payload.id === admin.id)!
    );
  },
};

/* customerProvider */
export const customerProvider: Provider<Customer> = {
  resource: 'customers',
  edit: async ({ payload }) => {
    return Promise.resolve(
      CUSTOMER_MOCKS.find((customer) => payload.id === customer.id)!
    );
  },
  create: async ({ payload }) => {
    return Promise.resolve(
      CUSTOMER_MOCKS.find((customer) => payload.id === customer.id)!
    );
  },
  getList: async ({ pagination }) => {
    const { page = 1, pageSize = 2 } = pagination || {};
    return Promise.resolve(CUSTOMER_MOCKS.slice(page - 1, pageSize)!);
  },
  getById: async ({ id }) => {
    return Promise.resolve(
      CUSTOMER_MOCKS.find((customer) => customer.id === id)!
    );
  },
  deleteOne: async ({ payload }) => {
    return Promise.resolve(
      CUSTOMER_MOCKS.find((customer) => payload.id === customer.id)!
    );
  },
};
