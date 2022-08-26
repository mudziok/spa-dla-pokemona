import { fireEvent, render, screen } from '@testing-library/react';

import { PokemonBrief, PokemonSelect } from './component';

const avaliablePokemons: Array<PokemonBrief> = [
  { id: '1', name: 'Bulbasaur', pokedexNumber: 1 },
  { id: '2', name: 'Ivysaur', pokedexNumber: 2 },
];

describe('pokemon select', () => {
  test('is a list', () => {
    render(<PokemonSelect avaliablePokemons={avaliablePokemons} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('can select pokemons', () => {
    const mockOnSelected = jest.fn();
    render(
      <PokemonSelect
        avaliablePokemons={avaliablePokemons}
        onSelected={mockOnSelected}
      />
    );

    fireEvent.click(screen.getByText('BULBASAUR'));
    expect(mockOnSelected).lastCalledWith('1');

    fireEvent.click(screen.getByText('IVYSAUR'));
    expect(mockOnSelected).lastCalledWith('2');
  });

  test('highlights selected pokemon', () => {
    render(
      <PokemonSelect avaliablePokemons={avaliablePokemons} selectedId={'1'} />
    );
    expect(screen.getByText('BULBASAUR')).toHaveStyle('background: lightblue');
    expect(screen.getByText('IVYSAUR')).not.toHaveStyle(
      'background: lightblue'
    );
  });
});
