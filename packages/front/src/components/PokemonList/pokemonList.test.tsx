import { useState } from 'react';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { AuthContext, AuthProvider } from '../../context/authContext';
import { AxiosContext, AxiosProvider } from '../../context/axiosContext';
import { composeProviders } from '../../context/composeProviders';
import { OnlineProvider } from '../../context/onlineContext';
import { User, UserContext } from '../../context/userContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { Login } from '../Login/component';
import { PokemonList } from '../PokemonList/component';
import { RequireAuth } from '../RequireAuth/component';

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

export const mockedFunction = jest.fn();
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

const ComposedProviders = composeProviders([
  AuthProvider,
  AxiosProvider,
  OnlineProvider,
]);

// export const MockPokemonList = () => {
//   const [token, setToken] = useState('');
//   const value = { token, setToken };
//   const mockUser = {
//     id: 1,
//     username: 'remek@wp.pl',
//     email: 'remek@wp.pl',
//     confirmed: true,
//   };
//   const [user, setUser] = useState<User>(mockUser);

//   return (
//     <BrowserRouter>
//       <AuthContext.Provider value={value}>
//         <AxiosContext.Provider
//           value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
//         >
//           <UserContext.Provider value={{ user }}>
//             <ThemeProvider theme={theme}>
//               <Routes>
//                 <Route path='/' element={<Login />} />
//                 <Route
//                   path='/pokemons'
//                   element={
//                     <RequireAuth>
//                       <PokemonList />
//                     </RequireAuth>
//                   }
//                 />
//               </Routes>
//             </ThemeProvider>
//           </UserContext.Provider>
//         </AxiosContext.Provider>
//       </AuthContext.Provider>{' '}
//     </BrowserRouter>
//   );
// };

export const MockPokemonList = () => {
  return (
    <ThemeProvider theme={theme}>
      <ComposedProviders>
        <PokemonList />
      </ComposedProviders>
    </ThemeProvider>
  );
};

const URL = 'http://localhost:1337/api/pokemons';

export const serverPokemons = setupServer(
  rest.get(URL, (req, res, ctx) => {
    return res(
      ctx.json({
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
        data: pokemonsRender,
      })
    );
  }),
  rest.delete(URL + `/2`, (req, res, ctx) => {
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
  test('is rendered sidebar part', async () => {
    render(<MockPokemonList />);

    expect(await screen.findByTestId('catch-button')).toBeInTheDocument();
  });

  test('is rendered main part', () => {
    render(<MockPokemonList />);

    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('if is 3 pokemons from API, the list have 3 pokemons', async () => {
    render(<MockPokemonList />);

    const listElement = await screen.findAllByRole('listitem');

    await waitFor(() => expect(listElement).toHaveLength(3));
  });

  test('if is 0 pokemons from API, the list should not appears', async () => {
    serverPokemons.use(
      rest.get(URL, (req, res, ctx) => {
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

    fireEvent.click(screen.getByTestId('catch-button'));

    expect(mockedFunction).toBeCalled();
  });
});
