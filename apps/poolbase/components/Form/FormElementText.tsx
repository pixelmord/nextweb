import { Field, ErrorMessage } from 'formik';

export type FormElementTextProps = {
  label: string;
  id: string;
  type?: 'text' | 'number';
};
export function FormElementText({ label, id, type = 'text' }: FormElementTextProps) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold pt-2 pb-1" htmlFor={id}>
        {label}
      </label>
      <Field
        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'"
        id={id}
        name={id}
        type={type}
      />
      <ErrorMessage component="p" className="text-red-500 text-sm" name={id} />
    </div>
  );
}
