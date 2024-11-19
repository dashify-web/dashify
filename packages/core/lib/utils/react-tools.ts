import React, { ReactElement, ReactNode } from 'react';

export const mapReactChildrens = <ChildProps, K>(
  children: ReactNode,
  mapper: (child: ReactElement<ChildProps>) => K
) => {
  const childrens = React.Children.toArray(children);
  return childrens.map((child) => mapper(child as ReactElement<ChildProps>));
};
