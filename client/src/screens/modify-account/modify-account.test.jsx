import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render, fireEvent, screen } from '@testing-library/react';
import ModifyAccount from './modify-account';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';

const server = setupServer(
  http.get(`${import.meta.env.VITE_SERVER_URI}/api/users/1`, () => {
    return HttpResponse.json({
      data: {
        data: {
          firstName: 'James',
          lastName: 'Walker',
          email: 'jwalk@email.com',
        }
      }
    });
  }),

  http.put(`${import.meta.env.VITE_SERVER_URI}/api/users/1`, () => {
    return HttpResponse.json('user modified');
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid='location-display'>{location.pathname}</div>;
}

beforeEach(() => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/" element={<ModifyAccount />} />
        <Route path="/dashboard" element={<div>Dashboard Displayed</div>} />
        <Route path='*' element={<div>No Match</div>} />
      </Routes>
      <LocationDisplay />
    </MemoryRouter>,
  );
});

function fireInput(labelText, value) {
  const input = screen.getByLabelText(labelText);

  fireEvent.input(input, {
    target: {
      value: value,
    },
  });

  return input;
}

function inputAndValidate(labelText, value) {
  fireInput(labelText, value);

  const submitButton = screen.getByRole('button', { name: /Create/i });
  fireEvent.click(submitButton);
}

async function findErrorElement(labelText) {
  const errors = await screen.findAllByRole('alert');
  if (errors.length !== 5) {
    throw new Error('Expected 5 error messages to appear, got ' + errors.length);
  }

  const fieldNames = ['First Name', 'Last Name', 'Email', 'Password', 'Confirm Password'];
  return errors[fieldNames.indexOf(labelText)];
}

test('should display required errors (1 per field) when value is invalid', async () => {
  const submitButton = screen.getByRole('button', { name: /Create/i });
  fireEvent.click(submitButton);

  const errors = await screen.findAllByRole('alert');
  expect(errors).toHaveLength(5);

  const fieldNames = ['First Name', 'Last Name', 'Email', 'Password', 'Confirm Password'];
  for (let i = 0; i < 5; i++) {
    expect(errors[i]).toHaveTextContent(fieldNames[i] + ' is required');
  }
});

describe('first name validation', () => {
  const labelText = 'First Name';

  test('display first name min length error', async () => {
    inputAndValidate(labelText, 'a');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('First Name must be at least 3 characters long');
  });

  test('display first name max length error', async () => {
    inputAndValidate(labelText, 'aaaaaaaaaaaaaaaaaaaaaaa');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('First Name cannot exceed 22 characters');
  });
});

describe('last name validation', () => {
  const labelText = 'Last Name';

  test('display last name min length error', async () => {
    inputAndValidate(labelText, 'a');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Last Name must be at least 3 characters long');
  });

  test('display last name max length error', async () => {
    inputAndValidate(labelText, 'aaaaaaaaaaaaaaaaaaaaaaa');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Last Name cannot exceed 22 characters');
  });
});

describe('email validation', () => {
  const labelText = 'Email';

  test('display email pattern error', async () => {
    inputAndValidate(labelText, 'invalidEmail');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Entered value does not match email format');
  });
});

describe('password validation', () => {
  const labelText = 'Password';

  test('display password min length error', async () => {
    inputAndValidate(labelText, 'a');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Password must be at least 8 characters long');
  });

  test('display password at least 1 digit error', async () => {
    inputAndValidate(labelText, 'aaaaaaaa');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Password must contain at least 1 digit');
  });

  test('display password at least 1 letter error', async () => {
    inputAndValidate(labelText, '11111111');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Password must contain at least 1 letter');
  });

  test('display password at least 1 special character error', async () => {
    inputAndValidate(labelText, 'aaaa1111');

    const error = await findErrorElement(labelText);
    expect(error).toHaveTextContent('Password must contain at least 1 special character');
  });
});

describe('password validation', () => {
  const labelText = 'Confirm Password';

  test('display confirm password match password error', async () => {
    fireInput('Password', '1imagination!');
    inputAndValidate(labelText, 'notAMatchingPassword1!');

    const errors = await screen.findAllByRole('alert');
    expect(errors[errors.length - 1]).toHaveTextContent('Confirm Password must match Password');
  });
});

test('Submitting valid input makes a request to the backend', async () => {
  fireInput('First Name', 'James');
  fireInput('Last Name', 'Walker');
  fireInput('Email', 'jwalk@email.com');
  fireInput('Password', '1imagination!');
  fireInput('Confirm Password', '1imagination!');

  fireEvent.click(screen.getByRole('button', { name: /create/i }));

  expect(await screen.findByText('Dashboard Displayed')).toBeInTheDocument();
  expect(await screen.findByTestId('location-display')).toHaveTextContent('/dashboard');
});
