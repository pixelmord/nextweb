import { cva, type VariantProps } from 'class-variance-authority';

export const labelStyle = cva('block font-medium', {
  variants: {
    state: {
      default: ['text-gray-700'],
      warning: ['text-orange-700'],
      info: ['text-blue-700'],
      success: ['text-green-700'],
      error: ['text-red-700'],
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
export function Label({ children, className, ...rest }: LabelProps) {
  return (
    <label className={className} {...rest}>
      {children}
    </label>
  );
}
