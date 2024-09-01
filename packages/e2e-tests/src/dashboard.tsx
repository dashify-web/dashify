import { FC } from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, NoAuthRoutes, Resource, WithAuthRoutes, useRequiredAuthentication, useRequiredRole } from '@dashify/core';
import { Role } from './types';
import { authProvider } from './auth-provider';
import { adminProvider, customerProvider } from './providers';

const RoleAdminsComponent = () => {
  useRequiredAuthentication({ requireAuth: true });
  useRequiredRole<Role>({
    requiredRole: Role.ADMIN
  });

  return <div>nrole-admins</div>
}

const RoleAllComponent = () => {
  useRequiredAuthentication({ requireAuth: true });
  return <div>nrole-all</div>
}

const RoleAnonymousComponent = () => {
  useRequiredAuthentication({ requireAuth: false });
  return <div>nrole-anonymous</div>
}

export const DashboardApp: FC = () => {
  return (
    <Dashboard
      requireAuth={false}
      authProvider={authProvider}
      authLoadingComponent={<p>auth-loading</p>}
      providers={[adminProvider, customerProvider]}
    >
      <Resource requireAuth requireRole={Role.ADMIN} name='admins' list={<p>admins-list</p>} />
      <Resource requireAuth={false} name='customers' list={<p>customers-list</p>} />
      <NoAuthRoutes>
        <Route path='/auth-error' element={<p>auth-error</p>} />
        <Route path='/role-error' element={<p>role-error</p>} />
        <Route path='/unknown-error' element={<p>unknown-error</p>} />
        <Route path='/nrole-anonymous' element={<RoleAnonymousComponent />} />
        <Route path='/nrole-all' element={<RoleAllComponent />} />
        <Route path='/nrole-admins' element={<RoleAdminsComponent />} />
      </NoAuthRoutes>
      <WithAuthRoutes>
        <Route path='/wrole-all' element={<p>wrole-all</p>} />
      </WithAuthRoutes>
      <WithAuthRoutes requireRole={Role.ADMIN}>
        <Route path='/wrole-admins' element={<p>wrole-admins</p>} />
      </WithAuthRoutes>
    </Dashboard>
  );
};
