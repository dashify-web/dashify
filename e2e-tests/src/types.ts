export type Dummy = {
  name: string;
  id: string;
};

export type Admin = {
  id: string;
  email: string;
  salary: number;
  username: string;
  password: string;
  role: Role;
};

export type Customer = {
  id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
};

export type Role = 'CUSTOMER' | 'ADMIN';

export type SigninData = {
  username: string;
  password: string;
};

export type SignupData = SigninData & {
  email: string;
};

export type UserDetails = {
  id: string;
  role: Role;
};
