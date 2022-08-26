import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { PokemonSelect } from './components';

const server = setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon?limit=151', (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1154,
        next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
        previous: null,
        results: [
          {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
          {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('pokemon select', () => {
  test('is rendered', () => {
    render(<PokemonSelect setSelectedNumber={() => {}} />);
    expect(screen.getByRole('list')).toBeDefined();
  });

  test('is hitting api', async () => {
    render(<PokemonSelect setSelectedNumber={() => {}} />);
    await screen.findAllByRole('listitem');

    expect(screen.getAllByRole('listitem').length).toEqual(2);
  });
});
