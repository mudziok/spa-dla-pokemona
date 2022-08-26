import { render, screen } from '@testing-library/react';

import { PokemonInfo, PokemonSelect } from './component';

const avaliablePokemons: Array<PokemonInfo> = [
  { id: '5', name: 'Bulbasaur', pokedexNumber: 1 },
  { id: '8', name: 'Ivysaur', pokedexNumber: 2 },
];

describe('pokemon select', () => {
  test('is rendered', () => {
    render(
      <PokemonSelect
        avaliablePokemons={avaliablePokemons}
        setSelectedNumber={() => {}}
      />
    );
    expect(screen.getByRole('list')).toBeDefined();
  });
});
