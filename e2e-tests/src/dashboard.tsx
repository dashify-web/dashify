import { FC } from 'react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { Dashboard, Resource } from '@dashify/core';
import { NoAuthRoutes } from '@dashify/auth';
import { Route } from 'react-router-dom';

import { CustomerList } from './operations/chakra/customers';
import { AdminList } from './operations/chakra/admins';
import { DummyShow } from './operations/core/dummies';
import {
  authProvider,
  adminProvider,
  customerProvider,
  getPageListInfos,
  dummyProvider,
} from './providers';
import { axiosInstance } from './config/axios';

const chakraProvider = createSystem(defaultConfig);
export const DashboardApp: FC = () => {
  return (
    <ChakraProvider value={chakraProvider}>
      <Dashboard
        requireAuth
        Layout={({ children }) => <>{children}</>}
        authProvider={authProvider}
        AuthLoadingComponent={() => <p>auth-loading</p>}
        providers={[adminProvider, customerProvider, dummyProvider]}
        options={{ getPageListInfos }}
        clientConfigurer={async (handleAuthError) => {
          axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => handleAuthError(error)
          );
        }}
      >
        <Resource
          requireAuth
          name="admins"
          list={<AdminList />}
          requiredRoles={['ADMIN']}
        />
        <Resource
          requireAuth
          name="customers"
          list={<CustomerList />}
          requiredRoles={['ADMIN', 'CUSTOMER']}
        />
        <Resource name="dummies" requireAuth={false} show={<DummyShow />} />
        <NoAuthRoutes>
          <Route path="/role-error" element={<p>role-error</p>} />
          <Route path="/auth-error" element={<p>auth-error</p>} />
          <Route path="/unknown-error" element={<p>unknown-error</p>} />
        </NoAuthRoutes>
      </Dashboard>
    </ChakraProvider >
  );
};
