import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { AuthProvider } from '../../context/authContext';
import { PokemonList } from './component';

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

const MockPokemonList = () => {
  return (
    <AuthProvider>
      <PokemonList />
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

describe('pokemon list', () => {
  test('is rendered', () => {
    render(<MockPokemonList />);

    const btnElement = screen.getByRole('button');
    expect(btnElement).toBeInTheDocument();
  });

  test('after click button should navigated user to catch pokemon', async () => {
    render(<MockPokemonList />);

    const btnElement = screen.getByRole('button');
    fireEvent.click(btnElement);

    await new Promise(process.nextTick);
    expect(mockFunction).toBeCalled();
  });
});
