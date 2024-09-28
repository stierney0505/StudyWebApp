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

  http.put(`${import.meta.env.VITE_SERVER_URI}/api/users/1`, async ({ request }) => {
    const data = await request.json();
    if (data.firstName === 'incorrect') {
      return HttpResponse.error('test error')
    }

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
    <MemoryRouter initialEntries={['/', '/modify-account']}>
      <Routes>
        <Route path="/modify-account" element={<ModifyAccount />} />
        <Route path="/request-password-reset" element={<div>Request Password Reset</div>} />
        <Route path="/" element={<div>Default Page Displayed</div>} />
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

  const submitButton = screen.getByRole('button', { name: /Update/i });
  fireEvent.click(submitButton);
}

async function findErrorElement(labelText) {
  const errors = await screen.findAllByRole('alert');
  if (errors.length !== 3) {
    throw new Error('Expected 3 error messages to appear, got ' + errors.length);
  }

  const fieldNames = ['First Name', 'Last Name', 'Email'];
  return errors[fieldNames.indexOf(labelText)];
}

test('should display required errors (1 per field) when value is invalid', async () => {
  const submitButton = screen.getByRole('button', { name: /Update/i });
  fireEvent.click(submitButton);

  const errors = await screen.findAllByRole('alert');
  expect(errors).toHaveLength(3);

  const fieldNames = ['First Name', 'Last Name', 'Email'];
  for (let i = 0; i < 3; i++) {
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

test('Submitting and getting error from backend shows error response on page', async () => {
  fireInput('First Name', 'incorrect');
  fireInput('Last Name', 'Walker');
  fireInput('Email', 'jwalk@email.com');

  fireEvent.click(screen.getByRole('button', { name: /Update/i }));

  expect(await screen.findByText('Error updating account details.')).toBeInTheDocument();
});

test('Submitting valid input makes a request to the backend', async () => {
  fireInput('First Name', 'James');
  fireInput('Last Name', 'Walker');
  fireInput('Email', 'jwalk@email.com');

  fireEvent.click(screen.getByRole('button', { name: /Update/i }));

  expect(await screen.findByText('Account details successfully updated!')).toBeInTheDocument();
});

test('Pressing "Go Back" button goes to previous location in navigation history', async () => {
  const goBackButton = screen.getByRole('button', { name: /Go Back/i });

  fireEvent.click(goBackButton);

  expect(await screen.findByText('Default Page Displayed')).toBeInTheDocument();
  expect(await screen.findByTestId('location-display')).toHaveTextContent('/');
})

test('Pressing "Reset Password" button goes to reset password page', async () => {
  const resetPasswordButton = screen.getByRole('button', { name: /Reset Password/i });

  fireEvent.click(resetPasswordButton);

  expect(await screen.findByText('Request Password Reset')).toBeInTheDocument();
  expect(await screen.findByTestId('location-display')).toHaveTextContent('/request-password-reset');
})
