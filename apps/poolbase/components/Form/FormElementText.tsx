import { Field, ErrorMessage } from 'formik';
import { Label, fieldStyle } from 'ui';

export type FormElementTextProps = {
  label: string;
  id: string;
  type?: 'text' | 'number';
};
export function FormElementText({ label, id, type = 'text' }: FormElementTextProps) {
  return (
    <div className="my-4">
      <Label htmlFor={id}>{label}</Label>
      <Field className={fieldStyle({ state: 'default', className: 'mt-1' })} id={id} name={id} type={type} />
      <ErrorMessage component="p" className="text-sm text-red-500" name={id} />
    </div>
  );
}
