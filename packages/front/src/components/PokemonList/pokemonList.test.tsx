import { useState } from 'react';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { AuthContext } from '../../context/authContext';
import { AxiosContext } from '../../context/axiosContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate, AxiosPrivateRoutes } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { PokemonList } from '../PokemonList/component';
import '@testing-library/jest-dom/extend-expect';

export const pokemons = [
  {
    id: 1,
    name: 'Eevee',
    pokedexNumber: 1,
    coughtAt: '2022-10-10T08:10:00.000Z',
  },
  {
    id: 3,
    name: 'Diglet',
    pokedexNumber: 3,
    coughtAt: '2022-10-10T08:10:00.000Z',
  },
];

export let pokemonsRender = [
  ...pokemons,
  {
    id: 2,
    name: 'bulbasaur',
    pokedexNumber: 2,
    coughtAt: '2022-10-10T08:10:00.000Z',
  },
];

export const MockPokemonList = () => {
  const [token, setToken] = useState('');
  const value = { token, setToken };
  return (
    <AuthContext.Provider value={value}>
      <AxiosContext.Provider
        value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
      >
        <ThemeProvider theme={theme}>
          <PokemonList />
        </ThemeProvider>
      </AxiosContext.Provider>
    </AuthContext.Provider>
  );
};

export const mockedFunction = jest.fn();

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

export const serverPokemons = setupServer(
  rest.get(AxiosPrivateRoutes.POKEMONS, (req, res, ctx) => {
    return res(
      ctx.json({
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
        data: pokemonsRender,
      })
    );
  }),
  rest.delete(AxiosPrivateRoutes.POKEMONS + `/2`, (req, res, ctx) => {
    pokemonsRender = pokemons;
    return res(ctx.status(200), ctx.json({}));
  })
);

beforeAll(() => serverPokemons.listen({ onUnhandledRequest: 'warn' }));

afterEach(() => {
  serverPokemons.resetHandlers();
});

afterAll(() => serverPokemons.close());

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

  test('if is 3 pokemons from API, the list have 3 pokemons', async () => {
    render(<MockPokemonList />);

    const listElement = await screen.findAllByRole('listitem');
    expect(listElement).toHaveLength(3);
  });

  test('if is 0 pokemons from API, the list should not appears', async () => {
    serverPokemons.use(
      rest.get(AxiosPrivateRoutes.POKEMONS, (req, res, ctx) => {
        return res(
          ctx.json({
            jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
            data: [],
          })
        );
      })
    );

    render(<MockPokemonList />);

    await waitFor(() =>
      expect(screen.queryAllByRole('listitem')).toHaveLength(0)
    );
  });

  test('click on pokemon, pokemon should be deleted', async () => {
    render(<MockPokemonList />);
    const pokemonElement = await screen.findByText('BULBASAUR');
    fireEvent.click(pokemonElement);
    await waitForElementToBeRemoved(() => screen.queryByText('BULBASAUR'));

    await waitFor(() =>
      expect(screen.queryAllByRole('listitem')).toHaveLength(2)
    );
  });

  test('after click button should navigated user to catch pokemon', async () => {
    render(<MockPokemonList />);

    const btnElement = screen.getByRole('button');
    fireEvent.click(btnElement);

    expect(mockedFunction).toBeCalled();
  });
});
