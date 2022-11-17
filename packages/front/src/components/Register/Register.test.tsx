import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { AuthContext, AuthProvider } from '../../context/authContext';
import { AxiosContext, AxiosProvider } from '../../context/axiosContext';
import { composeProviders } from '../../context/composeProviders';
import { OnlineProvider } from '../../context/onlineContext';
import {
  User,
  UserContext,
  UserContextProvider,
} from '../../context/userContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { Login } from '../Login/component';
import { Register } from './Register';

export const mockedFunction = jest.fn();

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

const existedMockUser = { identifier: 'test@gmail.com', password: '123456' };

const ComposedProviders = composeProviders([
  AuthProvider,
  AxiosProvider,
  OnlineProvider,
  UserContextProvider,
]);

export const MockRegister = () => {
  const [token, setToken] = useState('');
  const value = { token, setToken };
  const [user] = useState<User | null>(null);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <AxiosContext.Provider
          value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
        >
          <UserContext.Provider value={{ user }}>
            <ThemeProvider theme={theme}>
              <ComposedProviders>
                <Routes>
                  <Route path='/' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                </Routes>
              </ComposedProviders>
            </ThemeProvider>
          </UserContext.Provider>
        </AxiosContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

const URL = 'http://localhost:1338/api/auth/local/register';

export const server = setupServer(
  rest.post(URL, async (req, res, ctx) => {
    const data = await req.json();

    if (data.username === existedMockUser.identifier) {
      return res(
        ctx.status(400),
        ctx.json({
          error: {
            message: 'User is already exists',
          },
        })
      );
    } else {
      return res(
        ctx.json({
          jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
          user: {
            id: 1,
            username: 'Przemek',
            email: 'przemek@gmail.com',
            provider: 'local',
            confirmed: true,
            blocked: false,
            createdAt: '2022-08-24T08:51:05.616Z',
            updatedAt: '2022-08-24T12:11:11.364Z',
          },
        }),
        ctx.cookie('auth-token', 'abc-123')
      );
    }
  })
);

beforeAll(() => window.history.pushState({}, '', '/register'));

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('register test', () => {
  test('component is rendered', () => {
    render(<MockRegister />);

    expect(screen.getByTestId('registration-login')).toBeInTheDocument();
    expect(screen.getByTestId('registration-password')).toBeInTheDocument();
    expect(screen.getByTestId('registration-button')).toBeInTheDocument();
    expect(screen.getByTestId('login-button-redirect')).toBeInTheDocument();
  });

  test('input registration login is changed value', () => {
    render(<MockRegister />);
    const inputElement = screen.getByTestId(
      'registration-login'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'przemek@wp.pl' } });

    expect(inputElement.value).toBe('przemek@wp.pl');
  });

  test('input password is changed value', () => {
    render(<MockRegister />);
    const inputElement = screen.getByTestId(
      'registration-password'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '123456' } });

    expect(inputElement.value).toBe('123456');
  });

  test('functionality is working', async () => {
    render(<MockRegister />);
    const inputUser = screen.getByTestId(
      'registration-login'
    ) as HTMLInputElement;
    userEvent.type(inputUser, 'przemek@gmail.com');

    const inputPassword = screen.getByTestId(
      'registration-password'
    ) as HTMLInputElement;

    userEvent.type(inputPassword, '123456');

    userEvent.click(await screen.findByTestId('registration-button'));
    await new Promise(process.nextTick);

    expect(mockedFunction).toBeCalled();
  });

  test('redirect to page with login', async () => {
    render(<MockRegister />);

    userEvent.click(await screen.findByTestId('login-button-redirect'));

    await new Promise(process.nextTick);

    expect(mockedFunction).toBeCalled();
  });

  test('show error when user is already exist', async () => {
    render(<MockRegister />);
    const inputUser = screen.getByTestId(
      'registration-login'
    ) as HTMLInputElement;
    userEvent.type(inputUser, 'test@gmail.com');

    const inputPassword = screen.getByTestId(
      'registration-password'
    ) as HTMLInputElement;

    userEvent.type(inputPassword, '123456');

    userEvent.click(await screen.findByTestId('registration-button'));

    await screen.findByTestId('registration-error');
  });

  test('show error after entered invalid email', async () => {
    render(<MockRegister />);
    const inputUser = screen.getByTestId(
      'registration-login'
    ) as HTMLInputElement;
    userEvent.type(inputUser, 'przem');

    const inputPassword = screen.getByTestId(
      'registration-password'
    ) as HTMLInputElement;

    userEvent.type(inputPassword, '123456');

    userEvent.click(await screen.findByTestId('registration-button'));

    expect(await screen.findByTestId('registration-error')).toBeInTheDocument();
  });

  test('show error after entered invalid password', async () => {
    render(<MockRegister />);
    const inputUser = screen.getByTestId(
      'registration-login'
    ) as HTMLInputElement;
    userEvent.type(inputUser, 'przemek1@gmail.com');

    const inputPassword = screen.getByTestId(
      'registration-password'
    ) as HTMLInputElement;

    userEvent.type(inputPassword, '1');

    userEvent.click(await screen.findByTestId('registration-button'));

    expect(await screen.findByTestId('registration-error')).toBeInTheDocument();
  });
});
