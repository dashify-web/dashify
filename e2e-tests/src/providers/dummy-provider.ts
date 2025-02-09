import { Provider } from '@dashify/provider';
import { Dummy } from '../types';
import { axiosInstance } from '../config/axios';

export const dummyProvider: Provider<Dummy> = {
  resource: 'dummies',
  getById: async ({ id }) => {
    const { data } = await axiosInstance.get<Dummy>(`/dummies/${id}`);
    return data;
  },
  edit: () => {
    throw new Error('Not implemented');
  },
  create: () => {
    throw new Error('Not implemented');
  },
  deleteOne: () => {
    throw new Error('Not implemented');
  },
  getList: () => {
    throw new Error('Not implemented');
  },
};
