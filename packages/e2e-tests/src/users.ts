import { Admin, Customer } from './types';

export const ADMIN_ONE: Admin = {
  id: 'adminOneId',
  username: 'customerOneUsername',
  password: 'adminOnePassword',
  email: 'adminOne@gmail.com',
  salary: 5_000,
};

export const CUSTOME_ONE: Customer = {
  id: 'customerOneId',
  email: 'customerOne@gmail.com',
  password: 'customerOnePassword',
  username: 'customerOneUsername',
};

export const ADMIN_MOCKS: Admin[] = [
  ADMIN_ONE,
  ...Array.of(5)
    .fill(0)
    .map((_, index) => ({
      username: 'admin' + index,
      password: 'admin' + index,
      id: 'admin' + index,
      email: 'admin@gmail.com' + index,
      salary: index,
    })),
];

export const CUSTOMER_MOCKS: Customer[] = [
  CUSTOME_ONE,
  ...Array.of(5)
    .fill(0)
    .map((_, index) => ({
      username: 'admin' + index,
      password: 'admin' + index,
      id: 'admin' + index,
      email: 'admin@gmail.com' + index,
    })),
];
