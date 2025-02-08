import { Customer } from "../types";

export const CUSTOME_ONE: Customer = {
  id: 'customerOneId',
  email: 'customerOne@gmail.com',
  password: 'customerOnePassword',
  username: 'customerOneUsername',
};

export const CUSTOMER_MOCKS: Customer[] = [
  CUSTOME_ONE,
  ...Array(5)
    .fill(0)
    .map((_, index) => ({
      username: 'customer' + index,
      password: 'customer' + index,
      id: 'customer' + index,
      email: 'customer@gmail.com' + index,
    })),
];
