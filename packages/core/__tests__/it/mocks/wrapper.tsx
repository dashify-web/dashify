import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { Dashboard, NoAuthRoutes, Resource, useRequiredAuthentication, useRequiredRole, WithAuthRoutes, } from '../../../lib';
import { Role } from './types';
import { authProvider } from './auth-provider';
import { adminProvider, customerProvider } from './providers';

const RoleAdminsComponent = () => {
  useRequiredRole<Role>({
    role: Role.ADMIN
  });

  return <div>role-admins-component</div>
}

const RoleAllComponent = () => {
  useRequiredAuthentication({});
  return <div>role-all-component</div>
}

/* dashboard provider */
export const ItWrapper: FC = () => {
  return (
    <Dashboard
      requiredAuth
      authLoadingComponent={<p>loading</p>}
      authProvider={authProvider}
      providers={[adminProvider, customerProvider]}
    >
      <Resource requireAuth={false} name='customers' list={<p>customers-list</p>} />
      <Resource requireAuth requireRole={Role.ADMIN} name='admins' list={<p>admins-list</p>} />
      <NoAuthRoutes>
        <Route path='/role-anonymous' element={<p>role-anonymous</p>} />
        <Route path='/role-admins' element={<RoleAdminsComponent />} /> {/* role specified with useRequiredRole*/}
        <Route path='/role-all' element={<RoleAllComponent />} /> {/* auth specified with useRequiredAuthentication*/}
      </NoAuthRoutes>
      <WithAuthRoutes>
        <Route path='/role-all' element={<p>role-all</p>} />
      </WithAuthRoutes>
      <WithAuthRoutes requireRole={Role.ADMIN}>
        <Route path='/role-admins' element={<p>role-admins</p>} />
      </WithAuthRoutes>
    </Dashboard>
  );
};
