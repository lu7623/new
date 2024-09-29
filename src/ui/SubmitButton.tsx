import { FC } from 'react';

export interface ButtonProps {
  disabled: boolean;
  title: string;
}

export const SubmitButton: FC<ButtonProps> = ({ disabled, title }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="disabled:bg-slate-400 block px-6 py-1 enabled:cursor-pointer outline-none rounded-md text-white font-serif bg-emerald-900 "
    >
      {title}
    </button>
  );
};
