import { Customer, Role } from '../types';

export const CUSTOMER_ONE: Customer = {
  id: 'customerOneId',
  email: 'customerOne@gmail.com',
  password: 'customerOnePassword',
  username: 'customerOneUsername',
  role: 'CUSTOMER',
};

export const CUSTOMER_MOCKS: Customer[] = [
  CUSTOMER_ONE,
  ...Array(5)
    .fill(0)
    .map((_, index) => ({
      username: 'customer' + index,
      password: 'customer' + index,
      id: 'customer' + index,
      email: 'customer@gmail.com' + index,
      role: 'CUSTOMER' as Role,
    })),
];
