import React, { FC, useEffect } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider, ProviderContext } from '@dashify/providers';
import { useAdminStore } from '../stores';

export type AppProps = {
  title: string;
  providers: Provider<any>[];
  children: React.ReactNode;
};

export const App: FC<AppProps> = ({ title, children, providers }) => {
  const setTitle = useAdminStore((adminStore) => adminStore.setTitle);

  useEffect(() => {
    setTitle(title);
  }, []);

  return (
    <BrowserRouter>
      <ProviderContext providers={providers}>
        <Routes>{children}</Routes>
      </ProviderContext>
    </BrowserRouter>
  );
};
