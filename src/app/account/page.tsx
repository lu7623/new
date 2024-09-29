import { redirect } from 'next/navigation';
import { CustomerInfo } from './components/customerInfo/CustomerInfo';
import { LogoutButton } from './components/loggoutButton/LogoutButton';
import { CustomerService } from '@/service/api';
import { SessionDataStorage } from '@/controller/session/server';
import { Heading } from '@/ui/Heading';

export default async function Page() {
  const customer = new CustomerService();
  const { token } = new SessionDataStorage().getData();
  const isLogged = customer.isLogged();
  if (!isLogged) redirect('/login/');
  const customerData = !!token ? customer.getUserInfo(token?.token) : null;
  return (
    <>
      <Heading title="Your account" />
      {customerData && <CustomerInfo customer={customerData} />}
      <LogoutButton />
    </>
  );
}
