import { useState } from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { AuthContext } from '../../context/authContext';
import { AxiosContext } from '../../context/axiosContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { Login } from './component';

const mockFunction = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockFunction,
}));

const mockUser = { identifier: 'przemek@gmail.com', password: '123456' };

export const MockLogin = () => {
  const [token, setToken] = useState('');
  const value = { token, setToken };
  return (
    <AuthContext.Provider value={value}>
      <AxiosContext.Provider
        value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
      >
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
      </AxiosContext.Provider>
    </AuthContext.Provider>
  );
};

export const server = setupServer(
  rest.post('http://localhost:1337/api/auth/local', async (req, res, ctx) => {
    const data = await req.json();

    if (
      data.identifier !== mockUser.identifier ||
      data.password !== mockUser.password
    ) {
      return res(
        ctx.status(400),
        ctx.json({
          error: {
            message: 'Invalid identifier or password',
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
        })
      );
    }
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('login test', () => {
  test('component is rendered', () => {
    render(<MockLogin />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('input user is rendered', () => {
    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText('user');

    expect(inputElement).toBeInTheDocument();
  });

  test('input password is rendered', () => {
    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText('password');

    expect(inputElement).toBeInTheDocument();
  });

  test('input user is changed value', () => {
    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText(
      'user'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'przemek@wp.pl' } });

    expect(inputElement.value).toBe('przemek@wp.pl');
  });

  test('input password is changed value', () => {
    render(<MockLogin />);
    const inputElement = screen.getByPlaceholderText(
      'password'
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '123456' } });

    expect(inputElement.value).toBe('123456');
  });

  test('redirect after correct login', async () => {
    render(<MockLogin />);
    const inputUser = screen.getByPlaceholderText('user') as HTMLInputElement;
    userEvent.type(inputUser, 'przemek@gmail.com');

    const inputPassword = screen.getByPlaceholderText(
      'password'
    ) as HTMLInputElement;
    userEvent.type(inputPassword, '123456');

    const btn = await screen.findByRole('button');

    userEvent.click(btn);

    await new Promise(process.nextTick);

    expect(mockFunction).toBeCalled();
  });

  test('show error after entered wrong user mail', async () => {
    render(<MockLogin />);
    const inputUser = screen.getByPlaceholderText('user') as HTMLInputElement;
    userEvent.type(inputUser, 'przemek123@gmail.com');

    const inputPassword = screen.getByPlaceholderText(
      'password'
    ) as HTMLInputElement;
    userEvent.type(inputPassword, '123456');

    // const btn = await screen.findByRole('button');

    userEvent.click(await screen.findByRole('button'));

    await waitFor(() => screen.findByText('Invalid identifier or password'));

    await screen.findByText('Invalid identifier or password');
  });

  test('show error after entered wrong password', async () => {
    render(<MockLogin />);
    const inputUser = screen.getByPlaceholderText('user') as HTMLInputElement;
    userEvent.type(inputUser, 'przemek@gmail.com');

    const inputPassword = screen.getByPlaceholderText(
      'password'
    ) as HTMLInputElement;
    userEvent.type(inputPassword, '12345678');

    // const btn = await screen.findByRole('button');

    // userEvent.click(btn);
    userEvent.click(await screen.findByRole('button'));

    await waitFor(() => screen.findByText('Invalid identifier or password'));
    await screen.findByText('Invalid identifier or password');
  });
});
