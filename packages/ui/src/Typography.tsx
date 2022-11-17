import * as React from 'react';

export const H1: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className, ...rest }) => {
  return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>;
};
export const H2: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className, ...rest }) => {
  return <h2 className={`text-2xl font-bold ${className}`}>{children}</h2>;
};
