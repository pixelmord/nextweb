import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

export const fieldStyle = cva('block w-full rounded-md  shadow-sm  sm:text-sm', {
  variants: {
    state: {
      default: ['border-gray-300', 'focus:border-blue-500', 'focus:ring-blue-500'],
      warning: ['border-orange-300', 'focus:border-blue-500', 'focus:ring-blue-500'],
      info: ['border-blue-300', 'focus:border-blue-500', 'focus:ring-blue-500'],
      success: ['border-green-300', 'focus:border-blue-500', 'focus:ring-blue-500'],
      error: ['border-red-300', 'focus:border-blue-500', 'focus:ring-blue-500'],
    },
  },
  compoundVariants: [
    {
      state: 'default',

      className: '',
    },
    {
      state: 'info',

      className: '',
    },
    {
      state: 'success',

      className: '',
    },
    {
      state: 'warning',

      className: '',
    },
    {
      state: 'error',

      className: '',
    },
  ],
  defaultVariants: {
    state: 'default',
  },
});

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof fieldStyle> {}
export const FormFieldText = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ type = 'text', state, className, ...rest }: FieldProps, ref) => {
    className = fieldStyle({ state, className });
    return <input type={type} className={className} {...rest} ref={ref} />;
  }
);
FormFieldText.displayName = 'FormFieldText';
