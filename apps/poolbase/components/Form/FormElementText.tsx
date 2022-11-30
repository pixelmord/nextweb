import { Field, ErrorMessage } from 'formik';
import { Label, fieldStyle } from 'ui';

export type FormElementTextProps = {
  label: string;
  id: string;
  type?: 'text' | 'number';
};
export function FormElementText({ label, id, type = 'text' }: FormElementTextProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Field className={fieldStyle({ state: 'default' })} id={id} name={id} type={type} />
      <ErrorMessage component="p" className="text-sm text-red-500" name={id} />
    </div>
  );
}
