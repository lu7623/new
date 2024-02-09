'use client';

import style from './../../../registration/page.module.css';
import { useRouter } from 'next/navigation';
import { logout } from '../../account-actions';

export function LogoutButton() {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem('promocode');
    logout();
    router.refresh();
    router.push('/login');
  }

  return (
    <form action={handleLogout}>
      <button className={style.sentFormBtn} type="submit">
        Logout
      </button>
    </form>
  );
}
