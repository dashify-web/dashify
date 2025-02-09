import React, { FC, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import {
  Routes,
  RequiredAuthValueContext,
  RequiredAuthValueContextType,
} from '@dashify/auth';
import { ResourceNameContext } from '../context';

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
  requiredRoles,
  requireAuth,
}) => {
  return (
    <ResourceNameContext resource={name}>
      <RequiredAuthValueContext
        requiredRoles={requiredRoles}
        requireAuth={requireAuth}
      >
        <Routes>
          {list && <Route path={`/${name}`} element={list} />}
          {create && <Route path={`/${name}/create`} element={create} />}
          {show && <Route path={`/${name}/:id`} element={show} />}
          {edit && <Route path={`/${name}/:id/edit`} element={edit} />}
        </Routes>
      </RequiredAuthValueContext>
    </ResourceNameContext>
  );
};
