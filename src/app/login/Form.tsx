'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from './login-actions';
import { loginSchema } from './schema';
import { useState } from 'react';
import { FormInput } from '@/ui/FormInput';
import { SubmitButton } from '@/ui/SubmitButton';

export interface IFormInput {
  email: string;
  password: string;
}

export const Form = () => {
  const [authError, setAuthError] = useState('');
  const [loginSuccess, setLogingSuccess] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);

  const styled = loginSuccess ? ' bg-[#c0e7b9] ' : ' bg-red-200';
  const msg = authError ? authError : 'Log in successful!';
  const {
    register,
    formState,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    await login(formData.email, formData.password)
      .then(() => {
        setLogingSuccess(true);
        setMsgVisible(true);
      })
      .catch((err) => {
        setAuthError(`\u{26A0} There was an error during authorization. ${err.message} \u{26A0}`);
        setMsgVisible(true);
      });
  };
  return (
    <>
      <p className={msgVisible ? `${styled}` : 'hidden'}>{msg}</p>
      <div className="flex flex-col gap-5 justify-center px-6 py-5 w-80 md:w-96">
        <h1 className="text-center uppercase mt-9 mb-5 font-serif text-emerald-900 font-bold text-2xl">Log in</h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput id="email" title="Email" register={{ ...register('email') }} error={errors.email} />
            <FormInput id="password" title="Password" register={{ ...register('password') }} error={errors.password} />

            <div>
              <SubmitButton disabled={!formState.isValid} title="Log in" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
