import * as React from 'react';

export const H1: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h1 className={`text-base-800 dark:text-base-100 text-4xl font-bold tracking-tight ${className}`} {...rest}>
      {children}
    </h1>
  );
};
export const H2: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h2 className={`text-base-800 dark:text-base-100 text-3xl font-bold tracking-tight ${className}`} {...rest}>
      {children}
    </h2>
  );
};
export const H3: React.FC<React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <h3 className={`text-base-800 dark:text-base-100 text-2xl font-bold tracking-tight ${className}`} {...rest}>
      {children}
    </h3>
  );
};
