import React from 'react';
import { FieldError } from 'react-hook-form';
import { Label, FormFieldText } from 'ui';

export type FormElementTextProps = {
  label?: string;
  id: string;
  type?: 'text' | 'number';
  error?: FieldError | any;
} & React.InputHTMLAttributes<HTMLInputElement>;
export const FormElementText = React.forwardRef<HTMLInputElement, FormElementTextProps>(
  ({ label, id, type = 'text', error, ...rest }: FormElementTextProps, ref) => {
    const state = error ? 'error' : 'default';
    return (
      <div className="my-4">
        {!!label && (
          <Label htmlFor={id} state={state}>
            {label}
          </Label>
        )}
        <FormFieldText id={id} name={id} type={type} state={state} ref={ref} {...rest} />
        {!!error?.message && <p className="px-1 text-xs text-red-600">{error.message}</p>}
      </div>
    );
  }
);
FormElementText.displayName = 'FormElementText';
