import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Navbar from './header';
import { useRouter } from 'next/navigation';
jest.mock('next/navigation', () => ({ useRouter: jest.fn().mockReturnValue('') }));

afterEach(cleanup);

it('Navbar changes after click', () => {
  render(<Navbar authorized={true} qty={3} />);

  const buttonMenu = screen.getByAltText('menu');
  expect(screen.getByTestId('nav')).toHaveClass('hidden');
  fireEvent.click(buttonMenu);

  expect(screen.getByTestId('nav')).toHaveClass('flex');
  expect(screen.getByTestId('nav')).not.toHaveClass('hidden');
});
