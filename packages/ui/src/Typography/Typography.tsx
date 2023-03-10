import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

export const headlineStyle = cva('text-base-800 dark:text-base-100 leading-tight', {
  variants: {
    styling: {
      h1: ['text-4xl', 'font-headline', 'font-medium'],
      h2: ['text-3xl', 'font-headline', 'font-medium'],
      h3: ['text-2xl', 'font-headline', 'font-medium'],
      h4: ['text-xl', 'font-sans', 'font-bold'],
      h5: ['text-l', 'font-sans', 'font-bold'],
      h6: ['text-base', 'font-sans', 'font-bold'],
    },
    vspace: {
      none: ['my-0'],
      tight: ['mt-2', 'mb-1'],
      normal: ['mt-4', 'mb-2'],
      loose: ['mt-8', 'mb-4'],
    },
  },
  compoundVariants: [],
  defaultVariants: {
    styling: 'h2',
    vspace: 'normal',
  },
});
export interface HeadlineProps
  extends React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>,
    VariantProps<typeof headlineStyle> {}

export const H1: React.FC<HeadlineProps> = ({ children, className, styling = 'h1', vspace = 'loose', ...rest }) => {
  className = headlineStyle({ styling, vspace, className });
  return (
    <h1 className={className} {...rest}>
      {children}
    </h1>
  );
};
export const H2: React.FC<HeadlineProps> = ({ children, className, styling = 'h2', vspace = 'loose', ...rest }) => {
  className = headlineStyle({ styling, vspace, className });
  return (
    <h2 className={className} {...rest}>
      {children}
    </h2>
  );
};
export const H3: React.FC<HeadlineProps> = ({ children, className, styling = 'h3', vspace = 'loose', ...rest }) => {
  className = headlineStyle({ styling, vspace, className });
  return (
    <h3 className={className} {...rest}>
      {children}
    </h3>
  );
};
export const H4: React.FC<HeadlineProps> = ({ children, className, styling = 'h4', vspace, ...rest }) => {
  className = headlineStyle({ styling, vspace, className });
  return (
    <h4 className={className} {...rest}>
      {children}
    </h4>
  );
};
export const H5: React.FC<HeadlineProps> = ({ children, className, styling = 'h5', vspace, ...rest }) => {
  className = headlineStyle({ styling, vspace, className });
  return (
    <h5 className={className} {...rest}>
      {children}
    </h5>
  );
};
export const H6: React.FC<HeadlineProps> = ({ children, className, styling = 'h6', vspace, ...rest }) => {
  className = headlineStyle({ styling, vspace, className });
  return (
    <h6 className={className} {...rest}>
      {children}
    </h6>
  );
};
