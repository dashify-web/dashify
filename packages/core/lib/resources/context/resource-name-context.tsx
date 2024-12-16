import React, { FC, ReactNode, createContext } from 'react';

export type ResourceNameContextType = string;

export const RESOURCE_NAME_CONTEXT =
  createContext<ResourceNameContextType | null>(null);

export type ResourceNameContextProps = {
  children: ReactNode;
  resource: string;
};

export const ResourceNameContext: FC<ResourceNameContextProps> = ({
  children,
  resource,
}) => {
  return (
    <RESOURCE_NAME_CONTEXT.Provider value={resource}>
      {children}
    </RESOURCE_NAME_CONTEXT.Provider>
  );
};
