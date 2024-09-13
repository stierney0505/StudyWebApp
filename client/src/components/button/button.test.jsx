import { expect, test } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import InputButton from './button';

const Home = () => <div>Welcome home!</div>
const Dashboard = () => <div>View your lessons here.</div>
const NoMatch = () => <div>No match.</div>
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location-display'>{location.pathname}</div>
}
const NavigateContainer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
      <LocationDisplay />
      <InputButton text={'Press this'} onClick={() => navigate('/dashboard')} />
    </div>
  );
}

test('Button with navigate in onClick should navigate elsewhere', () => {
  render(
    <NavigateContainer />,
    { wrapper: BrowserRouter },
  );

  expect(screen.queryByText('Welcome home!')).toBeDefined();
  expect(screen.getByTestId('location-display')).toHaveTextContent('/');

  const button = screen.getByRole('button');
  fireEvent.click(button);

  expect(screen.queryByText('View your lessons here.')).toBeDefined();
  expect(screen.getByTestId('location-display')).toHaveTextContent('/dashboard');
});

test('Default Button without onClick should do nothing and have type "button"', () => {
  render(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
      <LocationDisplay />
      <InputButton text={'Press this'} />
    </div>,
    { wrapper: BrowserRouter },
  );

  expect(screen.queryByText('Welcome home!')).toBeDefined();
  expect(screen.getByTestId('location-display')).toHaveTextContent('/');

  const button = screen.getByRole('button');
  fireEvent.click(button);

  expect(screen.queryByText('Welcome home!')).toBeDefined();
  expect(screen.getByTestId('location-display')).toHaveTextContent('/');

  expect(button).toHaveAttribute('type', 'button');
});

test('Button properties should propagate to child button element', () => {
  render(
    <InputButton text={'Press this'} name='test' />,
    { wrapper: BrowserRouter },
  );

  expect(screen.getByRole('button')).toHaveAttribute('name', 'test');
});

test('Button variants should have their variant-specific class', () => {
  render(
    <>
      <InputButton text="Small" size="small" />
      <InputButton text="Medium" size="medium" />
    </>,
    { wrapper: BrowserRouter }
  );

  expect(screen.getByRole('button', { name: 'Small' })).toHaveClass(/small/);
  expect(screen.getByRole('button', { name: 'Medium' })).toHaveClass(/medium/);
});
