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

const URL = 'http://localhost:1338/api/pokemons';

export const server = setupServer(
  rest.post(URL, async (req, res, ctx) => {
    const data = await req.json();
    if (
      data.data.name === '' ||
      !data.data.pokedexNumber ||
      !data.data.coughtAt
    ) {
      return res(
        ctx.status(400),
        ctx.json({ error: { message: 'error occurred' } })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        data: data,
      })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

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

    const inputName = screen.getByTestId('pokemon-name') as HTMLInputElement;
    userEvent.type(inputName, 'Bulba');

    const inputDate = screen.getByTestId('pokemon-date') as HTMLInputElement;
    userEvent.type(inputDate, '2022-09-29');

    const inputTime = screen.getByTestId('pokemon-time') as HTMLInputElement;
    userEvent.type(inputTime, '14:20');

    userEvent.click(await screen.findByTestId('catch-pokemon-button'));

    await new Promise(process.nextTick);

    expect(mockedFunction).toBeCalled();
  });

  test('did not working, when is missing name', async () => {
    render(<MockCatchPokemon />);
    await screen.findByText('BULBASAUR');
    userEvent.click(await screen.findByText('BULBASAUR'));

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

    expect(
      await screen.findByTestId('catch-pokemon-error')
    ).toBeInTheDocument();
  });

  test('did not working, when is missing date', async () => {
    render(<MockCatchPokemon />);
    await screen.findByText('BULBASAUR');
    userEvent.click(await screen.findByText('BULBASAUR'));

    const inputName = screen.getByTestId('pokemon-name') as HTMLInputElement;
    userEvent.type(inputName, 'Bulba');

    const inputTime = (await screen.findByTestId(
      'pokemon-time'
    )) as HTMLInputElement;
    userEvent.type(inputTime, '14:20');

    userEvent.click(await screen.findByTestId('catch-pokemon-button'));
    await new Promise(process.nextTick);

    expect(
      await screen.findByTestId('catch-pokemon-error')
    ).toBeInTheDocument();
  });

  test('did not working, when is missing time', async () => {
    render(<MockCatchPokemon />);
    await screen.findByText('BULBASAUR');
    userEvent.click(await screen.findByText('BULBASAUR'));

    const inputName = screen.getByTestId('pokemon-name') as HTMLInputElement;
    userEvent.type(inputName, 'Bulba');

    const inputDate = (await screen.findByTestId(
      'pokemon-date'
    )) as HTMLInputElement;
    userEvent.type(inputDate, '2022-09-29');

    userEvent.click(await screen.findByTestId('catch-pokemon-button'));
    await new Promise(process.nextTick);

    expect(
      await screen.findByTestId('catch-pokemon-error')
    ).toBeInTheDocument();
  });

  test('did not working, when is missing picked pokemon', async () => {
    render(<MockCatchPokemon />);

    const inputName = screen.getByTestId('pokemon-name') as HTMLInputElement;
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

    expect(
      await screen.findByTestId('catch-pokemon-error')
    ).toBeInTheDocument();
  });
});
