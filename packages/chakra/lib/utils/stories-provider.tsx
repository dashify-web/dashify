import React, { FC, PropsWithChildren } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const BrowserRouterProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={children} />
      </Routes>
    </BrowserRouter>
  );
};
