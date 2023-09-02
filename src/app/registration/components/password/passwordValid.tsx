'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface PasswordProps {
  password?: string;
  setPassword: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function PasswordValid({ password, setPassword }: PasswordProps) {
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setPassword(value);
    if (!value) {
      setError('');
      return;
    }
    if (!/^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$/.test(value)) {
      setError('Min 8 characters, at least 1 uppercase letter and 1 lowercase letter and 1 number');
      return;
    }
    setError('');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {error && <p className={style.errorMessage}>{error}</p>}
      <input
        type={passwordVisible ? 'text' : 'password'}
        name="password"
        pattern="^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zA-Z\d\S]{8,}$"
        minLength={8}
        value={password}
        onChange={handleInputChange}
        className={style.input}
      />
      <button className="absolute top-[25px] right-2" onClick={togglePasswordVisibility}>
        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </>
  );
}
