import {
  createSystem,
  defaultConfig,
  ChakraProvider as CoreChakraProvider,
} from '@chakra-ui/react';
import {
  ProviderContext as CoreProviderContext,
  FacadeProviderOptions,
} from '@dashify/provider';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DUMMY_MOCKS, dummyProvider } from './dummy-provider';

export const BrowserRouterProvider: FC<
  PropsWithChildren<{ anotherRoutes?: ReactNode }>
> = ({ children, anotherRoutes }) => {
  return (
    <BrowserRouter>
      <Routes>
        {anotherRoutes && anotherRoutes}
        <Route path="/*/:id" element={<p>Show</p>} />
        <Route path="/*/:id/edit" element={<p>Edit</p>} />
        <Route path="/*/create" element={<p>Create</p>} />
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

export const ProviderContext: FC<PropsWithChildren> = ({ children }) => {
  const getPageListInfos: FacadeProviderOptions['getPageListInfos'] = async ({
    currentProvider,
    pagination,
    ...getListArgs
  }) => {
    const nextPage = (pagination?.page ?? 1) + 1;
    const nextPageResponse = await currentProvider.getList({
      ...getListArgs,
      pagination: {
        page: nextPage,
        pageSize: pagination?.pageSize,
      },
    });

    return Promise.resolve({
      total: DUMMY_MOCKS.length,
      nextPage,
      prevPage: (pagination?.page ?? 1) - 1,
      hasNextPage: nextPageResponse.length > 0,
      hasPrevPage: (pagination?.page ?? 1) > 1,
    });
  };

  return (
    <CoreProviderContext
      options={{ getPageListInfos }}
      providers={[dummyProvider]}
    >
      {children}
    </CoreProviderContext>
  );
};
