import { useState } from 'react';

import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { AxiosContext } from '../../context/axiosContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { Login } from '../Login/component';
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

const mockUser = { identifier: 'przemek@gmail.com', password: '123456' };

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

export const MockLogin = () => {
  const [token, setToken] = useState('');
  const value = { token, setToken };
  return (
    <BrowserRouter>
      <AuthContext.Provider value={value}>
        <AxiosContext.Provider
          value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
        >
          <Routes>
            <Route element={<Login />} path='/' />
          </Routes>
        </AxiosContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export const mockedFunction = jest.fn();

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

export const serverUser = setupServer(
  rest.post('http://localhost:1337/api/auth/local', async (req, res, ctx) => {
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
// if (true) {
//   return res(
//     ctx.json({
//       jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
//       user: {
//         id: 1,
//         username: 'Przemek',
//         email: 'przemek@gmail.com',
//         provider: 'local',
//         confirmed: true,
//         blocked: false,
//         createdAt: '2022-08-24T08:51:05.616Z',
//         updatedAt: '2022-08-24T12:11:11.364Z',
//       },
//     })
//   );
// } else {
//     return res(
//         ctx.status(400),
//         ctx.json({
//           error: {
//             message: 'Invalid identifier or password',
//           },
//         })
//       );
// }

// rest.post('http://localhost:1337/api/auth/local', (req, res, ctx) => {
//       return res(
//         ctx.status(400),
//         ctx.json({
//           error: {
//             message: 'Invalid identifier or password',
//           },
//         })
//       );
//     })

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

// export const MockPokemonList = () => {
//   const [token, setToken] = useState('');
//   const value = { token, setToken };
//   return (
//     <AuthContext.Provider value={value}>
//       <AxiosContext.Provider
//         value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
//       >
//         <PokemonList />
//       </AxiosContext.Provider>
//     </AuthContext.Provider>
//   );
// };

// export const MockLogin = () => {
//   const [token, setToken] = useState('');
//   const value = { token, setToken };
//   return (
//     <AuthContext.Provider value={value}>
//       <AxiosContext.Provider
//         value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
//       >
//         <Login />
//       </AxiosContext.Provider>
//     </AuthContext.Provider>
//   );
// };

// export const mockFunction = jest.fn();

// jest.mock('react-router', () => ({
//   useNavigate: () => mockFunction,
// }));
