import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';

import {
  MockPokemonList,
  serverPokemons,
  mockedFunction,
} from '../MockTest/mock';

beforeAll(() => serverPokemons.listen({ onUnhandledRequest: 'bypass' }));

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
      rest.get('http://localhost:1337/api/pokemons', (req, res, ctx) => {
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
