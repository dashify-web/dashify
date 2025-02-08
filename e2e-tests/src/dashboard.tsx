import { FC } from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, Resource } from '@dashify/core';
import {
  NoAuthRoutes,
  WithAuthRoutes,
  useRequiredAuthentication,
} from '@dashify/auth';
import { Role } from './types';
import { CustomerList } from './customer-list';
import { authProvider } from './auth-provider';
import { adminProvider, customerProvider } from './providers';

const RoleAdminsComponent = () => {
  useRequiredAuthentication<Role>({
    requireAuth: true,
    requiredRoles: ['ADMIN'],
  });
  return <div>nrole-admins</div>;
};

const RoleAllComponent = () => {
  useRequiredAuthentication({});
  return <div>nrole-all</div>;
};

const RoleAnonymousComponent = () => {
  useRequiredAuthentication({ requireAuth: false });
  return <div>nrole-anonymous</div>;
};

export const DashboardApp: FC = () => {
  return (
    <Dashboard
      requireAuth
      authProvider={authProvider}
      AuthLoadingComponent={() => <p>auth-loading</p>}
      providers={[adminProvider, customerProvider]}
    >
      <Resource
        name="admins"
        requireRoles={['ADMIN']}
        list={<p>admins-list</p>}
      />
      <Resource requireAuth={false} name="customers" list={<CustomerList />} />
      <NoAuthRoutes>
        <Route path="/auth-error" element={<p>auth-error</p>} />
        <Route path="/role-error" element={<p>role-error</p>} />
        <Route path="/unknown-error" element={<p>unknown-error</p>} />
        <Route path="/nrole-anonymous" element={<RoleAnonymousComponent />} />
        <Route path="/nrole-all" element={<RoleAllComponent />} />
        <Route path="/nrole-admins" element={<RoleAdminsComponent />} />
      </NoAuthRoutes>
      <WithAuthRoutes>
        <Route path="/wrole-all" element={<p>wrole-all</p>} />
      </WithAuthRoutes>
      <WithAuthRoutes requireRoles={['ADMIN']}>
        <Route path="/wrole-admins" element={<p>wrole-admins</p>} />
      </WithAuthRoutes>
    </Dashboard>
  );
};
