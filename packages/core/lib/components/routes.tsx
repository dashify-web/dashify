import React, { FC, ReactNode } from 'react';
import {
  Routes as _Routes,
  Route as _Route,
  RoutesProps as _RoutesProps,
  Outlet,
} from 'react-router-dom';
import {
  useRequiredAuthentication,
  useRequiredAuthValueContext,
  useRequiredRole,
} from '../hooks';

const ElementWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { requireAuth, requireRoles } = useRequiredAuthValueContext();
  useRequiredAuthentication({ requireAuth });
  useRequiredRole({ requiredRoles: requireRoles });

  return <>{children}</>;
};

export const Routes: FC<_RoutesProps> = ({ children, ..._routesProps }) => {
  return (
    <_Routes {..._routesProps}>
      <_Route
        element={
          <ElementWrapper>
            <Outlet />
          </ElementWrapper>
        }
      >
        {children}
      </_Route>
    </_Routes>
  );
};
