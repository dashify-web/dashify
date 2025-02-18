import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div id="root" style={{ width: '100%', padding: '10px' }}>
      {children}
    </div>
  );
};
