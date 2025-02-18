import React, { FC, ReactNode } from 'react';
import {
  Routes as _Routes,
  Route as _Route,
  RoutesProps as _RoutesProps,
  Outlet,
} from 'react-router-dom';
import {
  useAuthProviderContext,
  useRequiredAuthentication,
  useRequiredAuthValueContext,
} from '../hooks';

const RouteWrapper: FC<{ children: ReactNode; noLayout: boolean }> = ({
  noLayout,
  children,
}) => {
  const { Layout } = useAuthProviderContext();
  const { requireAuth, requiredRoles } = useRequiredAuthValueContext();
  useRequiredAuthentication({
    requireAuth,
    requiredRoles,
  });

  return noLayout ? children : <Layout>{children}</Layout>;
};

export type RoutesProps = _RoutesProps & { noLayout?: boolean };

export const Routes: FC<RoutesProps> = ({
  children,
  noLayout = false,
  ..._routesProps
}) => {
  return (
    <_Routes {..._routesProps}>
      <_Route
        element={
          <RouteWrapper noLayout={noLayout}>
            <Outlet />
          </RouteWrapper>
        }
      >
        {children}
      </_Route>
    </_Routes>
  );
};
