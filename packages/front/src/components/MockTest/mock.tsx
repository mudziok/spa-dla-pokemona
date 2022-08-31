import { useState } from 'react';

import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';

import { AuthContext } from '../../context/authContext';
import { AxiosContext } from '../../context/axiosContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { PokemonList } from '../PokemonList/component';

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
        <PokemonList />
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
  rest.get('http://localhost:1337/api/pokemons', (req, res, ctx) => {
    return res(
      ctx.json({
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
        data: pokemonsRender,
      })
    );
  }),
  rest.delete('http://localhost:1337/api/pokemons/2', (req, res, ctx) => {
    pokemonsRender = pokemons;
    return res(ctx.status(200), ctx.json({}));
  })
);
