import React, { FC, ReactNode } from 'react';
import { Provider, ProviderContext } from '../../lib';
import { dumbLoading } from '@dashify/utils';

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

export const PEOPLE_COUNT = 5;
export const PEOPLE_MOCKS: Person[] = Array.from({ length: PEOPLE_COUNT }).map(
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
      PEOPLE_MOCKS.find((person) => payload.id === person.id)!
    );
  },
  create: async ({ payload }) => {
    return Promise.resolve(
      PEOPLE_MOCKS.find((person) => payload.id === person.id)!
    );
  },
  getList: async ({ pagination }) => {
    const { page = 1, pageSize = 2 } = pagination || {};
    return new Promise((resolve) =>
      dumbLoading(() => resolve(PEOPLE_MOCKS.slice(page - 1, pageSize)!))
    );
  },
  getById: async ({ id }) => {
    return Promise.resolve(PEOPLE_MOCKS.find((person) => person.id === id)!);
  },
  deleteOne: async ({ payload }) => {
    return Promise.resolve(
      PEOPLE_MOCKS.find((person) => payload.id === person.id)!
    );
  },
};

/* main provider */
export const ItWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ProviderContext providers={[dummyProvider, personProvider]}>
      {children}
    </ProviderContext>
  );
};
