import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { AuthProvider } from '../../context/authContext';
import { AxiosProvider } from '../../context/axiosContext';
import { composeProviders } from '../../context/composeProviders';
import { OnlineProvider } from '../../context/onlineContext';
import { UserContextProvider } from '../../context/userContext';
import { CatchPokemon } from './component';

const mockedFunction = jest.fn();

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useNavigate: () => mockedFunction,
}));

const ComposedProviders = composeProviders([
  AuthProvider,
  AxiosProvider,
  OnlineProvider,
  UserContextProvider,
]);

export const MockCatchPokemon = () => {
  return (
    <ThemeProvider theme={theme}>
      <ComposedProviders>
        <CatchPokemon />
      </ComposedProviders>
    </ThemeProvider>
  );
};

const URL_CATCH = 'http://localhost:1338/api/pokemons';

export const serverPokemons = setupServer(
  rest.post(URL_CATCH, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          coughtAt: '2022-12-13T14:20:00.000Z',
          createdAt: '2022-12-12T14:20:45.554Z',
          id: 1,
          name: 'Bulba',
          pokedexNumber: 1,
          updatedAt: '2022-12-12T14:20:45.554Z',
        },
      })
    );
  })
);

beforeAll(() => serverPokemons.listen({ onUnhandledRequest: 'warn' }));

afterEach(() => {
  serverPokemons.resetHandlers();
});

afterAll(() => serverPokemons.close());

describe('catch pokemon', () => {
  test('component is render', () => {
    render(<MockCatchPokemon />);

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-date')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-time')).toBeInTheDocument();
    expect(screen.getByTestId('catch-pokemon-button')).toBeInTheDocument();
  });

  test('component shows pokemons', async () => {
    render(<MockCatchPokemon />);

    await screen.findByText('BULBASAUR');
    expect(screen.getByTestId('test-list-id')).toBeInTheDocument();
    expect(screen.getByText('BULBASAUR')).toBeInTheDocument();
  });

  test('is working', async () => {
    render(<MockCatchPokemon />);
    await screen.findByText('BULBASAUR');
    userEvent.click(await screen.findByText('BULBASAUR'));

    const inputName = (await screen.findByTestId(
      'pokemon-name'
    )) as HTMLInputElement;
    userEvent.type(inputName, 'Bulba');

    const inputDate = (await screen.findByTestId(
      'pokemon-date'
    )) as HTMLInputElement;
    userEvent.type(inputDate, '2022-09-29');

    const inputTime = (await screen.findByTestId(
      'pokemon-time'
    )) as HTMLInputElement;
    userEvent.type(inputTime, '14:20');

    userEvent.click(await screen.findByTestId('catch-pokemon-button'));
    await new Promise(process.nextTick);

    expect(mockedFunction).toBeCalled();
  });
});
