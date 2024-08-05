import { /* afterAll, afterEach, beforeAll, */ expect, test } from 'vitest';
// import { http, HttpResponse } from 'msw';
// import { setupServer } from 'msw/node';
import { render, /* fireEvent, */ screen } from '@testing-library/react';
import CreateAccount from "./create-account";
import { BrowserRouter } from 'react-router-dom';

// const server = setupServer(
//   http.post('/api/user', () => {
//     return HttpResponse.json({ response: 'user created' });
//   }),
// );

// const testData = {
//   fname: 'Bob',
//   lname: 'Johnson',
//   email: 'bob.johson@email.com',
//   password: '10characters',
//   confirmPassword: '10characters',
// };

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// test('valid user of create account page', async () => {
//   render(
//     <CreateAccount />
//   );

//   const fnameInput = screen.getByLabelText('fname', { exact: false });
//   fireEvent.change(fnameInput, { target: { value: testData.fname }});

//   const lnameInput = screen.getByLabelText('lname', { exact: false });
//   fireEvent.change(lnameInput, { target: { value: testData.lname }});

//   const emailInput = screen.getByLabelText('email', { exact: false });
//   fireEvent.change(emailInput, { target: { value: testData.email }});

//   const passwordInput = screen.getByLabelText('password', { exact: false });
//   fireEvent.change(passwordInput, { target: { value: testData.password }});

//   const conPasswordInput = screen.getByLabelText('confirm-password', { exact: false });
//   fireEvent.change(conPasswordInput, { target: { value: testData.confirmPassword }});

//   fireEvent.click(screen.getByRole('button'));

// });

test('initial values are invalid', () => {
  render(
    <CreateAccount />,
    { wrapper: BrowserRouter },
  );

  const fnameInput = screen.getByLabelText('First Name');
  expect(fnameInput).toBeInvalid();

  const lnameInput = screen.getByLabelText('Last Name');
  expect(lnameInput).toBeInvalid();

  const emailInput = screen.getByLabelText('Email');
  expect(emailInput).toBeInvalid();

  const passwordInput = screen.getByLabelText('Password');
  expect(passwordInput).toBeInvalid();

  const conPasswordInput = screen.getByLabelText('Confirm Password');
  expect(conPasswordInput).toBeInvalid();
});