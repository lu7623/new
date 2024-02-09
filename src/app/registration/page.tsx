'use client';

import style from './page.module.css';
import React, { useEffect, useState } from 'react';
import EmailValid from './components/email/emailValid';
import PasswordValid from './components/password/passwordValid';
import FirstNameValid from './components/firstName/firstNameValid';
import LastNameValid from './components/lastName/lastNameValid';
import DataOfBirthValid from './components/dataOfBirth/dataOfBirthValid';
import { register } from './register-actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AddressSection from './components/addresses/addressSection';
import CheckboxAddress from './elements/checkbox/checkbox';
import { IMyAddress } from '@/service/api/CustomerService';
import Label from './elements/wrapper';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string | undefined>('');
  const [firstName, setFirstName] = useState<string | undefined>('');
  const [lastName, setLastName] = useState<string | undefined>('');
  const [dateOfBirth, setDateOfBirth] = useState<string | undefined>('');

  const [formShippingAddress, setFormShippingAddress] = useState<IMyAddress>({
    id: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    defaultShippingAddress: false,
  });

  const [formBillingAddress, setFormBillingAddress] = useState<IMyAddress>({
    id: '',
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    defaultBillingAddress: false,
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const styleColumns = !isChecked
    ? ' column-1 gap-6 lg:columns-3 md:columns-1 font-serif mb-6 '
    : ' column-1 gap-6 lg:columns-2 md:columns-1 font-serif mb-6 ';

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*\d)[a-zа-яA-ZА-Я\d\S]{8,}$/;
    const firstNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$/;
    const lastNameRegex = /^(?=.*[a-zA-Za-яА-ЯёЁ ])[a-zA-Za-яА-ЯёЁ ]{1,}$/;
    const streetRegex = /^.+$/;
    const cityRegex = /^([a-zA-Zа-яА-Я]+-?\s*)+$/;
    const postalCodeRegex = /^[1-90]{5,}$/;
    const countryRegex = /^.+$/;
    const emailValid = emailRegex.test(email);
    const passwordValid = passwordRegex.test(password!);
    const firstNameValid = firstNameRegex.test(firstName!);
    const lastNameValid = lastNameRegex.test(lastName!);
    const streetValid = streetRegex.test(formShippingAddress.streetName!);
    const cityValid = cityRegex.test(formShippingAddress.city!);
    const postalCodeValid = postalCodeRegex.test(formShippingAddress.postalCode!);
    const countryValid = countryRegex.test(formShippingAddress.country);
    const streetValidBilling = isChecked || streetRegex.test(formBillingAddress.streetName!);
    const cityValidBilling = isChecked || cityRegex.test(formBillingAddress.city!);
    const postalCodeValidBilling = isChecked || postalCodeRegex.test(formBillingAddress.postalCode!);
    const countryValidBilling = isChecked || countryRegex.test(formBillingAddress.country);
    setFormValid(
      emailValid &&
        passwordValid &&
        firstNameValid &&
        lastNameValid &&
        streetValid &&
        cityValid &&
        postalCodeValid &&
        countryValid &&
        streetValidBilling &&
        cityValidBilling &&
        postalCodeValidBilling &&
        countryValidBilling
    );
  }, [email, password, firstName, lastName, formShippingAddress, formBillingAddress, isChecked]);

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formGetData = new FormData(form);
    const formJson = Object.fromEntries(formGetData.entries());
    const formData = {
      email: formJson.email.toString(),
      password: formJson.password.toString(),
      firstName: formJson.firstName.toString(),
      lastName: formJson.lastName.toString(),
      dateOfBirth: formJson.dateOfBirth.toString(),
    };
    let shippingAddress = formShippingAddress;
    let billingAddress;
    isChecked ? (billingAddress = shippingAddress) : (billingAddress = formBillingAddress);
    if (formValid) {
      await register(formData, shippingAddress, billingAddress)
        .then(() => {
          setRegSuccess(true);
          setMsgVisible(true);
        })
        .catch((err) => {
          setRegError(`\u{26A0} There was an error. ${err.message} \u{26A0}`);
          setMsgVisible(true);
        });
    }
  };
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  if (regSuccess)
    setTimeout(() => {
      router.push('/');
    }, 1000);
  const styled = regSuccess ? ' bg-[#c0e7b9] ' : ' bg-red-200';
  const msg = regError ? regError : 'Registation successful!';
  return (
    <>
      <p className={msgVisible ? `${styled}` : 'hidden'}>{msg}</p>
      <div className={style.container}>
        <form id="formRegistr" onSubmit={handleRegistration}>
          <h2 className="text-center uppercase text-2xl font-serif my-5 font-bold text-emerald-900">Registration</h2>
          <div className={styleColumns}>
            <div>
              <div>
                <Label label="Email">
                  <EmailValid email={email} setEmail={setEmail} />
                </Label>
              </div>
              <div>
                <Label label="Password">
                  <PasswordValid
                    password={password}
                    onUpdate={(password) => {
                      setPassword(password);
                    }}
                  />
                </Label>
              </div>
              <div>
                <Label label="First Name">
                  <FirstNameValid firstName={firstName} setFirstName={setFirstName} />
                </Label>
              </div>
              <div>
                <Label label="Last Name">
                  <LastNameValid lastName={lastName} setLastName={setLastName} />
                </Label>
              </div>
              <div>
                <Label label="Date of birth">
                  <DataOfBirthValid dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth} />
                </Label>
              </div>
            </div>
            <AddressSection
              addressType="Shipping"
              formShippingAddress={formShippingAddress}
              onUpdate={(address: IMyAddress, isDefault: boolean) => {
                const newState = { ...address, defaultShippingAddress: isDefault };
                setFormShippingAddress(newState);
              }}
            />
            <CheckboxAddress label="Use for Billing address" checked={isChecked} onChange={handleCheckboxChange} />
            {!isChecked && (
              <AddressSection
                addressType="Billing"
                formShippingAddress={formBillingAddress}
                onUpdate={(address: IMyAddress, isDefault: boolean) => {
                  const newState = { ...address, defaultBillingAddress: isDefault };
                  setFormBillingAddress(newState);
                }}
              />
            )}
          </div>
          <button
            onClick={() => {
              setMsgVisible(false);
              setRegError('');
            }}
            type="submit"
            className={style.sentFormBtn}
            disabled={!formValid}
          >
            Register
          </button>
        </form>
      </div>
      <div className="flex w-auto h-20 items-center justify-center my-6 ">
        <p className="font-serif text-lg text-emerald-900 mx-10">Already have an account?</p>
        <Link
          className=" font-serif cursor-pointer leading-none px-6 py-1 border border-solid border-transparent rounded  bg-emerald-900 text-white text-lg"
          href="/login"
        >
          Log in
        </Link>
      </div>
    </>
  );
}
