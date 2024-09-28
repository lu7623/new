'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface IFormInput {
  email: string;
  password: string;
}

export const Form = () => {
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str}`;
  };
  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Please enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[A-Za-z\^\u0000-\u007F]/, getCharacterValidationError('letter'))
      .matches(/[\W|_/g]/, getCharacterValidationError('special caracter'))
      .min(8, 'Password should be at least 8 charcters long'),
  });
  const {
    register,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  return (
    <>
      <div className="flex flex-col gap-5 justify-center px-6 py-5 w-80 md:w-96">
        <h2>Log in</h2>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={() => {}} className="space-y-6">
            <div>
              <label htmlFor="email" className="block md:text-sm font-medium leading-6 ">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  defaultValue=""
                  {...register('email')}
                  type="text"
                  autoComplete="email"
                  className={
                    errors.email
                      ? 'block w-full border-purple-400 mx-0 leading-6 border-2 px-1 rounded focus:outline-none  focus:border-pink-400 focus:ring-1 focus:ring-pink-400'
                      : ' block w-full border-purple-400 mx-0 leading-6 border-2 px-1 rounded  focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                  }
                />
                <div className=" h-5">
                  {errors.email && <p className=" text-xs text-[#f6009c]">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block font-medium leading-6 md:text-sm">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  defaultValue=""
                  {...register('password')}
                  type="password"
                  className={
                    errors.password
                      ? 'block w-full border-purple-400 mx-0 leading-6 border-2 px-1 rounded focus:outline-none  focus:border-pink-400 focus:ring-1 focus:ring-pink-400'
                      : ' block w-full border-purple-400 mx-0 leading-6 border-2 px-1 rounded  focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400'
                  }
                />
                <div className=" h-5">
                  {errors.password && <p className=" text-xs text-[#f6009c]">{errors.password.message}</p>}
                </div>
              </div>
            </div>

            <div>
              <button type="submit" disabled={!formState.isValid}></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
