import { expect, test } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import InputButton from './button';

const Home = () => <div>Welcome home!</div>
const Dashboard = () => <div>View your lessons here.</div>
const NoMatch = () => <div>No match.</div>
const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location-display'>{location.pathname}</div>
}

test('Button with URL should navigate elsewhere', () => {
  render(
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
      <LocationDisplay />
      <InputButton text={'Press this'} URL={'dashboard'} />
    </div>,
    { wrapper: BrowserRouter },
  );
  
  expect(screen.queryByText('Welcome home!')).toBeDefined();
  expect(screen.getByTestId('location-display')).toHaveTextContent('/');

  const button = screen.getByRole('button');
  fireEvent.click(button);

  expect(screen.queryByText('View your lessons here.')).toBeDefined();
  expect(screen.getByTestId('location-display')).toHaveTextContent('/dashboard');
});

test('Button with no URL should not navigate elsewhere', () => {
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
});

test('Button properties should propagate to child button element', () => {
  render(
    <div>
      <InputButton text={'Press this'} name='test'/>
    </div>,
    { wrapper: BrowserRouter },
  );

  expect(screen.getByRole('button')).toHaveAttribute('name', 'test');
});