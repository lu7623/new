import style from './page.module.css';

import { RegistrationForm } from './components/RegistrationForm';
import { NavLink } from '@/ui/NavLink';

export default function Page() {
  return (
    <>
      <div className={style.container}>
        <RegistrationForm />
      </div>
      <div className="flex w-auto h-20 items-center justify-center my-6 ">
        <p className="font-serif text-lg text-emerald-900 mx-10">Already have an account?</p>
        <NavLink href="/login" title="Log in" />
      </div>
    </>
  );
}
