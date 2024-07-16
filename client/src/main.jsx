import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import './index.css'

import App from './App.jsx'
import CreateAccount from './screens/create-account/create-account.jsx';
import RequestPasswordReset from './screens/reset-password/request-password-reset/request-password-reset.jsx';
import PasswordResetRequestSent from './screens/reset-password/password-reset-request-sent/password-reset-request-sent.jsx';
import ChangePassword from './screens/reset-password/change-password/change-password.jsx';
import PasswordSuccessfullyChanged from './screens/reset-password/password-successfully-changed/password-successfully-changed.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
  {
    path: '/request-password-reset',
    element: <RequestPasswordReset />,
  },
  {
    path: '/password-reset-request-sent',
    element: <PasswordResetRequestSent />,
  },
  {
    path: '/change-password/:id',
    element: <ChangePassword />,
  },
  {
    path: '/password-successfully-changed',
    element: <PasswordSuccessfullyChanged />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
