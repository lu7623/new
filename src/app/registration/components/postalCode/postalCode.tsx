'use client';

import style from '../../page.module.css';
import React, { useState } from 'react';

interface PostalCodeProps {
  country: string;
  postalCode?: string;
  onUpdate: (street: string) => void;
}

const infoInput = {
  patternSixNum: '^[1-90]{6}$',
  patternSFiveNum: '^[1-90]{5}$',
  textMistake: 'Enter the postal code in the format of your country without spaces, commas and dashes',
};

export default function PostalCode({ country, postalCode, onUpdate }: PostalCodeProps) {
  const [error, setError] = useState('');
  const [postalCodeState, setPostalCode] = useState(postalCode);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    setPostalCode(value);
    if (!value) {
      setError('');
      return;
    }
    if (country === 'BY' || country === 'RU' || country === 'KZ') {
      const regexp = new RegExp(infoInput.patternSixNum);
      if (!regexp.test(value)) {
        setError(infoInput.textMistake);
        return;
      }
    } else {
      const regexp = new RegExp(infoInput.patternSFiveNum);
      if (!regexp.test(value)) {
        setError(infoInput.textMistake);
        return;
      }
    }
    onUpdate(value);
    setError('');
  };

  return (
    <>
      <input
        className={style.input}
        type="text"
        name="postalCode"
        value={postalCodeState ?? ''}
        onChange={handleInputChange}
        pattern={country === 'BY' || country === 'RU' || country === 'KZ' ? '^[1-90]{6}$' : '^[1-90]{5}$'}
      />
      {error && (
        <div className="max-h-[40px]">
          <p className={style.errorMessage}>{error}</p>
        </div>
      )}
    </>
  );
}
