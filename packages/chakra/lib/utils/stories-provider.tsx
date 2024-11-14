import {
  createSystem,
  defaultConfig,
  ChakraProvider as CoreChakraProvider,
} from '@chakra-ui/react';
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

const chakraProvider = createSystem(defaultConfig);
export const ChakraProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CoreChakraProvider value={chakraProvider}>{children}</CoreChakraProvider>
  );
};
