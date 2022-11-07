import * as React from "react";

export const H1: React.FC<React.PropsWithChildren> = ({children, ...rest}) => {
  return <h1 className="text-3xl font-bold">{children}</h1>;
};
