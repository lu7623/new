import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/validationSchema';
import { IFormInput } from '../utils/types';
import { useState } from 'react';
import { countriesArr } from '../utils/countries';
import { convertBase64 } from '../utils/filesize';
import { FormInput } from '@/ui/FormInput';

export const getStrength = (n: number) => {
  if (n < 4) return <span className=" text-red-600 font-bold">weak</span>;
  else if (n < 8) return <span className=" text-yellow-600 font-bold">medium</span>;
  else return <span className=" text-green-600 font-bold">strong</span>;
};

export default function Form() {
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>();
  const [passwordStrength, setPasswordStrength] = useState(0);

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
    const formData = Object.assign(
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
        file: fileStr,
        street: data.street,
        city: data.city,
        postalCode: data.postalCode,
      }
    );
  };
  const searchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCountrySearch = e.target.value;
    setCountrySuggestions(
      countriesArr.filter((c) => c.toLowerCase().startsWith(newCountrySearch.trim().toLowerCase()))
    );
  };
  return (
    <>
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
