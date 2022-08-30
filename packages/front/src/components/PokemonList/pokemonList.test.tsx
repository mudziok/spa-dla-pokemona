import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { AuthProvider } from '../../context/authContext';
import { PokemonList } from './component';

let pokemons = [
  {
    id: 2,
    name: 'bulbasaur',
    pokedexNumber: 1,
    coughtAt: '2022-10-10T08:10:00.000Z',
  },
];

const server = setupServer(
  rest.get('http://localhost:1337/api/pokemons', (req, res, ctx) => {
    return res(
      ctx.json({
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
        data: pokemons,
      })
    );
  }),
  rest.delete('http://localhost:1337/api/pokemons/2', (req, res, ctx) => {
    pokemons = pokemons.filter((pokemon) => pokemon.id !== 2);
    return res(
      ctx.status(200),
      ctx.json({
        data: pokemons,
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

afterEach(() => {
  server.resetHandlers();
  pokemons = [
    {
      id: 2,
      name: 'bulbasaur',
      pokedexNumber: 1,
      coughtAt: '2022-10-10T08:10:00.000Z',
    },
  ];
});

afterAll(() => server.close());

describe('pokemon list', () => {
  test('is rendered sidebar part', () => {
    render(<MockPokemonList />);

    const btnElement = screen.getByRole('button');
    expect(btnElement).toBeInTheDocument();
  });

  test('is rendered main part', () => {
    render(<MockPokemonList />);

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('click on pokemon, pokemon should be deleted', async () => {
    render(<MockPokemonList />);
    const pokemonElement = await screen.findByText('BULBASAUR');
    fireEvent.click(pokemonElement);
    await waitForElementToBeRemoved(() => screen.queryByText('BULBASAUR'));
  });

  test('after click button should navigated user to catch pokemon', async () => {
    render(<MockPokemonList />);

    const btnElement = screen.getByRole('button');
    fireEvent.click(btnElement);

    expect(mockFunction).toBeCalled();
  });
});
