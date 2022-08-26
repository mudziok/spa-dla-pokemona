import { render, screen } from '@testing-library/react';

import { PokemonBrief, PokemonSelect } from './component';

const avaliablePokemons: Array<PokemonBrief> = [
  { id: '1', name: 'Bulbasaur', pokedexNumber: 1 },
  { id: '2', name: 'Ivysaur', pokedexNumber: 2 },
];

describe('pokemon select', () => {
  test('is rendered', () => {
    render(
      <PokemonSelect
        avaliablePokemons={avaliablePokemons}
        onSelected={() => {}}
      />
    );
    expect(screen.getByRole('list')).toBeDefined();
  });
});
