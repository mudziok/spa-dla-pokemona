import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../../context/authContext';
import { Login } from './component';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useNavigate } from 'react-router';

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

const navigate = jest.fn();
// jest.mock('react-router', () => {
//   //   const React = require('react');
//   return jest.fn(() => ({
//     useNavigate: navigate,
//   }));
// });

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockNav = jest.fn();

jest.mock('react-router', () => ({
  useNavigate: () => mockNav,
}));

describe('login test', () => {
  test('is rendered', () => {
    const { debug } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('is hitting api', async () => {
    const { debug } = render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    debug();
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    await new Promise(process.nextTick);
    expect(mockNav).toBeCalled();
  });
});
