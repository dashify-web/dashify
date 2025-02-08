import { FC } from 'react';
import { Dashboard, Resource } from '@dashify/core';

import { AuthLoading } from './components';
import { CustomerList } from './operations/chakra/customers';
import { AdminList } from './operations/chakra/admins';
import { authProvider, adminProvider, customerProvider } from './providers';

export const DashboardApp: FC = () => {
  return (
    <Dashboard
      requireAuth
      authProvider={authProvider}
      AuthLoadingComponent={AuthLoading}
      providers={[adminProvider, customerProvider]}
    >
      <Resource name="admin" requireRoles={['ADMIN']} list={<AdminList />} />
      <Resource name="customer" requireAuth={false} list={<CustomerList />} />
    </Dashboard>
  );
};
