import * as React from "react";

export const H1: React.FC = ({children, ...rest}) => {
  return <h1 className="text-3xl font-bold">{children}</h1>;
};
