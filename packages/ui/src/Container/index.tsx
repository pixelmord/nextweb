import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

export const containerStyle = cva('w-full', {
  variants: {
    hspace: {
      full: ['p-0'],
      article: ['mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8'],
      page: ['mx-auto', 'max-w-7xl', 'px-4', 'sm:px-6', 'lg:px-8'],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    hspace: 'full',
  },
});
export interface ContainerProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>,
    VariantProps<typeof containerStyle> {}

export const Container: React.FC<ContainerProps> = ({ className, hspace = 'page', ...props }) => {
  className = containerStyle({ hspace, className });
  return <div className={className} {...props} />;
};
