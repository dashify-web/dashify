import { Provider } from '@dashify/provider';
import { Admin } from '../types';
import { ADMIN_MOCKS } from '../mocks';

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
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Promise.resolve(ADMIN_MOCKS.slice(startIndex, endIndex));
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
