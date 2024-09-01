import React, { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import {
  RequiredAuthValueContext,
  RequiredAuthValueContextType,
} from '../context';
import { Routes } from './routes';

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
  return (
    <RequiredAuthValueContext
      requireRole={requireRole}
      requireAuth={requireAuth}
    >
      <Routes>
        {list && <Route path={`/${name}`} element={list} />}
        {create && <Route path={`/${name}/create`} element={create} />}
        {show && <Route path={`/${name}/:id`} element={show} />}
        {edit && <Route path={`/${name}/:id/edit`} element={edit} />}
      </Routes>
    </RequiredAuthValueContext>
  );
};
