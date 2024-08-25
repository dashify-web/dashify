import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export type ResourceProps = {
  name: string;
  list?: React.ReactNode;
  show?: React.ReactNode;
  create?: React.ReactNode;
  edit?: React.ReactNode;
};

export const Resource: FC<ResourceProps> = ({
  name,
  list,
  edit,
  show,
  create,
}) => {
  return (
    <>
      <Routes>
        {list && <Route path={`/${name}`} element={list} />}
        {create && <Route path={`/${name}/create`} element={create} />}
        {show && <Route path={`/${name}/:id/show`} element={show} />}
        {edit && <Route path={`/${name}/:id/edit`} element={edit} />}
      </Routes>
    </>
  );
};
