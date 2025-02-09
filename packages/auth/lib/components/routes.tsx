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
} from '../hooks';

const RouteWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { requireAuth, requiredRoles } = useRequiredAuthValueContext();
  useRequiredAuthentication({
    requireAuth,
    requiredRoles,
  });

  return <>{children}</>;
};

export type RoutesProps = _RoutesProps;

export const Routes: FC<_RoutesProps> = ({ children, ..._routesProps }) => {
  return (
    <_Routes {..._routesProps}>
      <_Route
        element={
          <RouteWrapper>
            <Outlet />
          </RouteWrapper>
        }
      >
        {children}
      </_Route>
    </_Routes>
  );
};
