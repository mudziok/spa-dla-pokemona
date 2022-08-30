import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { AuthProvider } from '../../context/authContext';
import { AxiosProvider } from '../../context/axiosContext';
import { Login } from './component';

const server = setupServer(
  rest.post('http://localhost:1337/api/auth/local', (req, res, ctx) => {
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
  })
);

const MockLogin = () => {
  return (
    <AuthProvider>
      <AxiosProvider>
        <Login />
      </AxiosProvider>
    </AuthProvider>
  );
};

const mockFunction = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockFunction,
}));

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

  test('is hitting api', async () => {
    render(<MockLogin />);

    const btn = screen.getByRole('button');

    fireEvent.click(btn);

    await new Promise(process.nextTick);
    expect(mockFunction).toBeCalled();
  });

  test('handles server error', async () => {
    render(<MockLogin />);

    server.use(
      rest.post('http://localhost:1337/api/auth/local', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            error: {
              message: 'Invalid identifier or password',
            },
          })
        );
      })
    );
    const btn = screen.getByRole('button');

    fireEvent.click(btn);

    await screen.findByText('Invalid identifier or password');

    expect(
      screen.getByText('Invalid identifier or password')
    ).toBeInTheDocument();
  });
});
