import { useDescription, useTsController } from '@ts-react/form';
import React, { ChangeEventHandler } from 'react';
import { FormFieldText, Label } from 'ui';

export type FormElementTextProps = {
  type?: 'text' | 'number' | 'email' | 'url' | 'password';
} & React.InputHTMLAttributes<HTMLInputElement>;
export const FormElementText = ({ type = 'text', ...rest }: FormElementTextProps) => {
  const { label, placeholder } = useDescription();
  const {
    field: { onChange, ...fieldProps },
    error,
  } = useTsController<string>();
  const state = error ? 'error' : 'default';
  return (
    <div className="">
      {!!label && (
        <Label htmlFor={fieldProps.name} state={state} className="px-1">
          {label}
        </Label>
      )}
      <FormFieldText
        placeholder={placeholder}
        onChange={onChange as unknown as ChangeEventHandler<HTMLInputElement>}
        {...fieldProps}
        type={type}
        state={state}
        {...rest}
      />
      {!!error?.errorMessage && (
        <p className="text-danger-600 dark:text-danger-400 mt-1 px-1 text-xs">{error.errorMessage}</p>
      )}
    </div>
  );
};
FormElementText.displayName = 'FormElementText';
