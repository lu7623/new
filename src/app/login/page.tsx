import { redirect } from 'next/navigation';
import { SessionDataStorage } from '@/controller/session/server';
import { Form } from './Form';
import { NavLink } from '@/ui/NavLink';

export default function Page() {
  const { token } = new SessionDataStorage().getData();

  if (token) redirect('/');

  return (
    <>
      <Form />
      <NavLink href="/registration" title="Registration" />
    </>
  );
}
