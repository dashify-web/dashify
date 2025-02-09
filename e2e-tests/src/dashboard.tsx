import { FC } from 'react';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { Dashboard, Resource } from '@dashify/core';
import { NoAuthRoutes } from '@dashify/auth';
import { Route } from 'react-router-dom';

import { CustomerList } from './operations/chakra/customers';
import { AdminList } from './operations/chakra/admins';
import { authProvider, adminProvider, customerProvider } from './providers';
import { axiosInstance } from './config/axios';

const chakraProvider = createSystem(defaultConfig);
export const DashboardApp: FC = () => {
  return (
    <ChakraProvider value={chakraProvider}>
      <Dashboard
        requireAuth
        authProvider={authProvider}
        AuthLoadingComponent={() => <p>auth-loading</p>}
        providers={[adminProvider, customerProvider]}
        clientConfigurer={async (handleAuthError) => {
          axiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => handleAuthError(error)
          );
        }}
      >
        <Resource
          name="admins"
          requireAuth
          requireRoles={['ADMIN']}
          list={<AdminList />}
        />
        <Resource
          name="customers"
          requireAuth={false}
          list={<CustomerList />}
        />
        <NoAuthRoutes>
          <Route path="/role-error" element={<p>role-error</p>} />
          <Route path="/auth-error" element={<p>role-error</p>} />
          <Route path="/unknown-error" element={<p>role-error</p>} />
        </NoAuthRoutes>
      </Dashboard>
    </ChakraProvider>
  );
};
