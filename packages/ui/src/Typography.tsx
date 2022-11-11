import * as React from 'react';

export const H1: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className, ...rest }) => {
  return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;
};
