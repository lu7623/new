import { FC, FocusEventHandler } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
  id: string;
  title: string;
  defaultValue?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export const FormInput: FC<InputProps> = ({ id, register, title, defaultValue = '', error, onBlur }) => {
  return (
    <>
      <div>
        <label htmlFor={id} className="block md:text-sm font-medium leading-6 font-serif">
          {title}
        </label>
        <div className="mt-2">
          <input
            id={id}
            onBlur={onBlur}
            defaultValue={defaultValue}
            {...register}
            type="text"
            className={
              error
                ? 'block w-full bg-red-100 mx-0 leading-6 border-2 border-none p-1 rounded focus:outline-none  focus:ring-1 focus:ring-red-400'
                : ' block w-full bg-green-50  mx-0 leading-6 border-none p-1 rounded  focus:outline-none  focus:ring-1 focus:ring-emerald-900'
            }
          />
          <div className=" h-5">{error && <p className=" text-xs text-red-700">{error.message}</p>}</div>
        </div>
      </div>
    </>
  );
};
