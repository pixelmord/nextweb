import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

export const fieldStyle = cva(
  'block w-full rounded-md  shadow-sm  sm:text-sm bg-white text-base-800 dark:bg-base-900 dark:text-base-200',
  {
    variants: {
      state: {
        default: ['border-base-300', 'focus:border-accent-500', 'focus:ring-accent-500', 'dark:border-base-500'],
        warning: [
          'border-warning-300',
          'focus:border-warning-500',
          'focus:ring-warning-500',
          'dark:focus:border-warning-400',
          'dark:focus:ring-warning-400',
        ],
        info: [
          'border-info-300',
          'focus:border-info-500',
          'focus:ring-info-500',
          'dark:focus:border-info-400',
          'dark:focus:ring-info-400',
        ],
        success: [
          'border-success-300',
          'focus:border-success-500',
          'focus:ring-success-500',
          'dark:focus:border-danger-400',
          'dark:focus:ring-danger-400',
        ],
        error: [
          'border-danger-300',
          'focus:border-danger-500',
          'focus:ring-danger-500',
          'dark:focus:border-danger-400',
          'dark:focus:ring-danger-400',
        ],
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
  }
);

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof fieldStyle> {}
export const FormFieldText = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ type = 'text', state, className, ...rest }: FieldProps, ref) => {
    className = fieldStyle({ state, className });
    return <input type={type} className={className} {...rest} ref={ref} />;
  }
);
FormFieldText.displayName = 'FormFieldText';
