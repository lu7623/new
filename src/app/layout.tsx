import './globals.css';
import type { Metadata } from 'next';
import Navbar from './header';
import { PropsWithChildren } from 'react';
import { CustomerService } from '@/service/api';
import CartService from '@/service/api/CartService';

export const metadata: Metadata = {
  title: 'Cyber Ducks App',
  description: 'E-commerce app for Ostara Glass from The Cyber Ducks',
};

export default function RootLayout({ children }: PropsWithChildren) {
  const isLogged = new CustomerService().isLogged();
  const cartProdsQty = new CartService().cartProdsQty();
  return (
    <html lang="en">
      <body>
        <Navbar authorized={isLogged} qty={cartProdsQty ? cartProdsQty : 0} />
        {children}
      </body>
    </html>
  );
}
