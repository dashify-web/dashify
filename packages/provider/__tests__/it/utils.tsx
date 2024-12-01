import React, { FC, ReactNode } from 'react';
import { FacadeProviderOptions, Provider, ProviderContext } from '../../lib';

/* dummyProvider */
export type Dummy = {
  id: string;
  name: string;
};

export const DUMMIES_COUNT = 5;
export const DUMMIES_MOCKS: Dummy[] = Array.of(DUMMIES_COUNT)
  .fill(0)
  .map((_dummy, index) => ({
    id: index.toString(),
    name: `name ${index}`,
  }));

export const dummyProvider: Provider<Dummy> = {
  resource: 'dummies',
  edit: async ({ payload }) => {
    return Promise.resolve(
      DUMMIES_MOCKS.find((dummy) => payload.id === dummy.id)!
    );
  },
  create: async ({ payload }) => {
    return Promise.resolve(
      DUMMIES_MOCKS.find((dummy) => payload.id === dummy.id)!
    );
  },
  getList: async ({ pagination }) => {
    const { page = 1, pageSize = 2 } = pagination || {};
    return Promise.resolve(DUMMIES_MOCKS.slice(page - 1, pageSize));
  },
  getById: async ({ id }) => {
    return Promise.resolve(DUMMIES_MOCKS.find((dummy) => id === dummy.id)!);
  },
  deleteOne: async ({ payload }) => {
    return Promise.resolve(
      DUMMIES_MOCKS.find((dummy) => payload.id === dummy.id)!
    );
  },
};

/* Person provider */
export type Person = {
  id: string;
  name: string;
  age: number;
};

export const PERSON_COUNT = 5;
export const PERSON_MOCKS: Person[] = Array.from({ length: PERSON_COUNT }).map(
  (_person, index) => ({
    id: index.toString(),
    name: `Person ${index}`,
    age: 20 + index, // Example age, incremented with the index
  })
);

export const personProvider: Provider<Person> = {
  resource: 'persons',
  edit: async ({ payload }) => {
    return Promise.resolve(
      PERSON_MOCKS.find((person) => payload.id === person.id)!
    );
  },
  create: async ({ payload }) => {
    return Promise.resolve(
      PERSON_MOCKS.find((person) => payload.id === person.id)!
    );
  },
  getList: async ({ pagination }) => {
    const { page = 1, pageSize = 2 } = pagination || {};
    return new Promise((resolve) =>
      setTimeout(() => resolve(PERSON_MOCKS.slice(page - 1, pageSize)!), 500)
    );
  },
  getById: async ({ id }) => {
    return Promise.resolve(PERSON_MOCKS.find((person) => person.id === id)!);
  },
  deleteOne: async ({ payload }) => {
    return Promise.resolve(
      PERSON_MOCKS.find((person) => payload.id === person.id)!
    );
  },
};

/* main provider */
export const ItWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const getPageListInfos: FacadeProviderOptions['getPageListInfos'] = async ({
    currentProvider,
    resource,
    pagination,
    ...getListArgs
  }) => {
    const nextPage = pagination?.page ? pagination?.page + 1 : undefined;
    const nextPageResponse = await currentProvider.getList({
      ...getListArgs,
      pagination: {
        page: nextPage,
        pageSize: pagination?.pageSize,
      },
    });

    const total = resource === 'dummy' ? DUMMIES_COUNT : PERSON_COUNT;
    return Promise.resolve({
      total,
      nextPage,
      prevPage: (pagination?.page ?? 1) - 1,
      hasNextPage: nextPageResponse.length > 0,
      hasPrevPage: (pagination?.page ?? 1) > 1,
    });
  };

  return (
    <ProviderContext
      options={{ getPageListInfos }}
      providers={[dummyProvider, personProvider]}
    >
      {children}
    </ProviderContext>
  );
};
