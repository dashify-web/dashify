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

export type RoutesProps = _RoutesProps & { noLayout?: boolean };

const RouteWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { requireAuth, requiredRoles } = useRequiredAuthValueContext();
  useRequiredAuthentication({
    requireAuth,
    requiredRoles,
  });

  return <>{children}</>;
};

const RoutesContent: FC<Omit<RoutesProps, 'noLayout'>> = ({
  children,
  ...routesProps
}) => {
  return (
    <_Routes {...routesProps}>
      <_Route
        element={
          <RouteWrapper>
            <Outlet />
          </RouteWrapper>
        }
      >
        <_Route index element={<div />} />
        {children}
      </_Route>
    </_Routes>
  );
};

export const Routes: FC<RoutesProps> = ({
  children,
  noLayout = false,
  ..._routesProps
}) => {
  const { Layout } = useAuthProviderContext();
  return noLayout ? (
    <RoutesContent {..._routesProps}>{children}</RoutesContent>
  ) : (
    <Layout>
      <RoutesContent {..._routesProps}>{children}</RoutesContent>
    </Layout>
  );
};
