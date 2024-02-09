'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';

interface CityProps {
  city?: string;
  onUpdate: (street: string) => void;
}

const infoInput = {
  pattern: '^([a-zA-Zа-яА-Я]+-?s*)+$',
  textMistake: 'Must contain at least one character and no special characters or numbers',
};

export default function CityValid({ city, onUpdate }: CityProps) {
  const [error, setError] = useState('');
  const [citySate, setCityState] = useState(city);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setCityState(value);
    if (!value) {
      setError('');
      return;
    }
    const regexp = new RegExp(infoInput.pattern);
    if (!regexp.test(value)) {
      setError(infoInput.textMistake);
      return;
    }
    onUpdate(value);
    setError('');
  };

  return (
    <>
      <input
        type="text"
        name="city"
        pattern="^([a-zA-Zа-яА-Я]+-?s*)+$"
        value={citySate ?? ''}
        onChange={handleInputChange}
        className={style.input}
      />
      {error && (
        <div className="max-h-[40px]">
          <p className={style.errorMessage}>{error}</p>
        </div>
      )}
    </>
  );
}
