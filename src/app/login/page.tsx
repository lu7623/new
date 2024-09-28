import LoginForm from './LoginForm';
import { redirect } from 'next/navigation';
import { SessionDataStorage } from '@/controller/session/server';
import { RegisterPageButton } from './RegisterPageButton';

export default function Page() {
  const { token } = new SessionDataStorage().getData();

  if (token) redirect('/');

  return (
    <>
      <LoginForm />
      <RegisterPageButton />
    </>
  );
}
