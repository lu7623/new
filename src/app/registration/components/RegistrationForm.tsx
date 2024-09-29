import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/validationSchema';
import { IData, IFormInput } from '../utils/types';
import { useState } from 'react';
import { countriesArr } from '../utils/countries';
import { convertBase64 } from '../utils/filesize';
import { FormInput } from '@/ui/FormInput';
import { registration } from '../register-actions';
import { useRouter } from 'next/navigation';
import { getStrength } from '../utils/getStrength';
import { UserMessage } from '@/ui/UserMessage';

export function RegistrationForm() {
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  const msg = regError ? regError : 'Registation successful!';

  if (regSuccess)
    setTimeout(() => {
      router.push('/catalog');
    }, 1000);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const fileStr = data.file ? ((await convertBase64(data.file[0])) as string) : '';
    const formData: IData = Object.assign(
      {},
      {
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        accept: data.accept,
        confirm: data.confirm,
        country: data.country,
        email: data.email,
        gender: data.gender,
        fileStr: fileStr,
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
      }
    );

    await registration(formData)
      .then(() => {
        setRegSuccess(true);
        setMsgVisible(true);
      })
      .catch((err) => {
        setRegError(`\u{26A0} There was an error during registration. ${err.message} \u{26A0}`);
        setMsgVisible(true);
      });
  };

  const searchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountrySearch = e.target.value;
    setCountrySuggestions(
      countriesArr.filter((c) => c.toLowerCase().startsWith(newCountrySearch.trim().toLowerCase()))
    );
  };

  return (
    <>
      <UserMessage message={msg} visible={msgVisible} success={regSuccess} />
      <div className="flex justify-center items-center flex-col w-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/3 gap-6 mb-10">
          <section>
            <h2>Personal info</h2>
            <FormInput
              title="First name:"
              id="firstName"
              register={{ ...register('firstName') }}
              error={errors.firstName}
            />
            <FormInput
              title="Last name:"
              id="lastName"
              register={{ ...register('lastName') }}
              error={errors.lastName}
            />
            <FormInput title="Email:" id="email" register={{ ...register('email') }} error={errors.email} />
            <FormInput
              title="Password:"
              id="password"
              register={{ ...register('password') }}
              error={errors.password}
              onBlur={(e) => setPasswordStrength(e.target.value.length)}
            />

            {passwordStrength > 0 && <p>Password strength: {getStrength(passwordStrength)}</p>}
            <FormInput
              title="Confirm password:"
              id="confirm"
              register={{ ...register('confirm') }}
              error={errors.confirm}
            />

            <div className="w-full">
              <label className="mr-4">Gender Selection</label>
              <select {...register('gender')}>
                <option value="female" className=" bg-slate-200">
                  female
                </option>
                <option value="male" className=" bg-slate-200">
                  male
                </option>
                <option value="other" className=" bg-slate-200">
                  other
                </option>
              </select>
              {errors.gender && <p className=" text-red-700 text-xs">{errors.gender.message}</p>}
            </div>

            <div>
              <label className="text-white " htmlFor="file">
                Load avatar:
              </label>
              <input type="file" id="file" accept=".png, .jpeg, .jpg" {...register('file')} />

              <p>{errors.file?.message}</p>
            </div>
            <div className="w-full ">
              <div className="flex">
                <input type="checkbox" id="acceptTerms" {...register('accept')} />
                <label htmlFor="acceptTerms" className="ml-4">
                  Accept terms and conditions
                </label>
              </div>
              {errors.accept && <p className=" text-red-700 text-xs w-full">{errors.accept.message}</p>}
            </div>
          </section>
          <section>
            <h2>Address</h2>
            <FormInput title="Street:" id="street" register={{ ...register('street') }} error={errors.street} />
            <FormInput title="City:" id="city" register={{ ...register('city') }} error={errors.city} />
            <FormInput
              title="Postal Code:"
              id="postalCode"
              register={{ ...register('postalCode') }}
              error={errors.postalCode}
            />

            <div className="w-full">
              <label className="mr-4">Select country:</label>
              <input {...register('country')} className=" bg-slate-200 w-full" onChange={searchCountry} />
              <ul>
                {countrySuggestions?.map((c) => (
                  <li
                    className=" w-full bg-slate-200 hover:bg-slate-50 cursor-pointer"
                    key={c}
                    onClick={() => {
                      setValue('country', c);
                      setCountrySuggestions([]);
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
              {errors.country && <p className=" text-red-700 text-xs">{errors.country.message}</p>}
            </div>
          </section>

          <div className=" w-full flex justify-center">
            <input
              type="submit"
              className=" disabled:bg-gray-500 bg-slate-700 text-white w-32 rounded-md px-4 py-2"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
