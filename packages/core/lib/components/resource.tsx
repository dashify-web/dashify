import React, { FC, ReactNode } from 'react';
import { Route as _Route } from 'react-router-dom';
import {
  RequiredAuthValueContext,
  RequiredAuthValueContextType,
} from '../context';
import { useRequiredAuthValueContext } from '../hooks';

export type ResourceProps = Partial<RequiredAuthValueContextType> & {
  name: string;
  list?: ReactNode;
  show?: ReactNode;
  create?: ReactNode;
  edit?: ReactNode;
};

export const Resource: FC<ResourceProps> = ({
  name,
  list,
  edit,
  show,
  create,
  requireRole,
  requireAuth,
}) => {
  const { requireAuth: inheritRequiredAuth, requireRole: inheritRequiredRole } =
    useRequiredAuthValueContext();

  return (
    <RequiredAuthValueContext
      requireRole={requireRole || inheritRequiredRole}
      requireAuth={requireAuth || inheritRequiredAuth}
    >
      {list && <_Route path={`/${name}`} element={list} />}
      {create && <_Route path={`/${name}/create`} element={create} />}
      {show && <_Route path={`/${name}/:id`} element={show} />}
      {edit && <_Route path={`/${name}/:id/edit`} element={edit} />}
    </RequiredAuthValueContext>
  );
};
