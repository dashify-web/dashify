import { ResourceType } from '@dashify/provider';
import React, { ReactNode, createContext } from 'react';

export type ResourceContextType<T extends ResourceType> = T;

export const RESOURCE_CONTEXT = createContext<ResourceContextType<any> | null>(
  null
);

export type ResourceContextProps<T extends ResourceType> = {
  children: ReactNode;
  resource: T;
};

export const ResourceContext = <T extends ResourceType>({
  children,
  resource,
}: ResourceContextProps<T>) => {
  return (
    <RESOURCE_CONTEXT.Provider value={resource}>
      {children}
    </RESOURCE_CONTEXT.Provider>
  );
};
