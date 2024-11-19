import { Provider } from '@dashify/provider';

export type Dummy = {
  id: string;
  name: string;
  email?: string;
};

export const DUMMY_MOCKS: Dummy[] = [
  {
    id: '1',
    name: 'dummy name 1',
    email: 'dummy1@example.com',
  },
  {
    id: '2',
    name: 'dummy name 2',
  },
  {
    id: '3',
    name: 'dummy name 3',
    email: 'dummy3@example.com',
  },
  {
    id: '4',
    name: 'dummy name 4',
  },
  {
    id: '5',
    name: 'dummy name 5',
    email: 'dummy5@example.com',
  },
  {
    id: '6',
    name: 'dummy name 6',
  },
  {
    id: '7',
    name: 'dummy name 7',
    email: 'dummy7@example.com',
  },
  {
    id: '8',
    name: 'dummy name 8',
  },
  {
    id: '9',
    name: 'dummy name 9',
    email: 'dummy9@example.com',
  },
  {
    id: '10',
    name: 'dummy name 10',
  },
];

export const dummyProvider: Provider<Dummy> = {
  resource: 'dummies',
  edit: async ({ payload }) => {
    return Promise.resolve(
      DUMMY_MOCKS.find((dummy) => payload.id === dummy.id)!
    );
  },
  create: async ({ payload }) => {
    return Promise.resolve(
      DUMMY_MOCKS.find((dummy) => payload.id === dummy.id)!
    );
  },
  getList: async ({ pagination }) => {
    const { page = 1, pageSize = 2 } = pagination || {};
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return Promise.resolve(DUMMY_MOCKS.slice(startIndex, endIndex));
  },
  getById: async ({ id }) => {
    return Promise.resolve(DUMMY_MOCKS.find((dummy) => dummy.id === id)!);
  },
  deleteOne: async ({ payload }) => {
    return Promise.resolve(
      DUMMY_MOCKS.find((dummy) => payload.id === dummy.id)!
    );
  },
};
