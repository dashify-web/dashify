import { Provider } from '@dashify/provider';
import { Customer } from '../types';
import { CUSTOMER_MOCKS } from '../mocks';

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
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Promise.resolve(CUSTOMER_MOCKS.slice(startIndex, endIndex));
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
