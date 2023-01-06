import { cva, type VariantProps } from 'class-variance-authority';

export const labelStyle = cva('block font-medium', {
  variants: {
    state: {
      default: ['text-base-700', 'dark:text-base-300'],
      warning: ['text-warning-700', 'dark:text-warning-300'],
      info: ['text-info-700', 'dark:text-info-300'],
      success: ['text-success-700', 'dark:text-success-300'],
      error: ['text-danger-700', 'dark:text-danger-400'],
    },
    size: {
      xsmall: ['text-xs'],
      small: ['text-sm'],
      medium: ['text-sm'],
      large: ['text-base'],
      xlarge: ['text-base'],
    },
  },
  compoundVariants: [
    {
      state: 'default',
      size: 'medium',
      className: '',
    },
    {
      state: 'info',
      size: 'medium',
      className: '',
    },
    {
      state: 'success',
      size: 'medium',
      className: '',
    },
    {
      state: 'warning',
      size: 'medium',
      className: '',
    },
    {
      state: 'error',
      size: 'medium',
      className: '',
    },
  ],
  defaultVariants: {
    state: 'default',
    size: 'medium',
  },
});

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelStyle> {}
export function Label({ children, className, state, ...rest }: LabelProps) {
  className = labelStyle({ state, className });
  return (
    <label className={className} {...rest}>
      {children}
    </label>
  );
}
