import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { PokemonBrief, PokemonSelect } from './component';

const avaliablePokemons: Array<PokemonBrief> = [
  { id: '1', name: 'Bulbasaur', pokedexNumber: 1 },
  { id: '2', name: 'Ivysaur', pokedexNumber: 2 },
];

describe('PokemonSelect', () => {
  test('is a list', () => {
    render(
      <ThemeProvider theme={theme}>
        <PokemonSelect avaliablePokemons={avaliablePokemons} />
      </ThemeProvider>
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  test('displays correct number of items', () => {
    render(
      <ThemeProvider theme={theme}>
        <PokemonSelect avaliablePokemons={avaliablePokemons} />
      </ThemeProvider>
    );
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  test('allows selecting a pokemon', () => {
    const mockOnSelected = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <PokemonSelect
          avaliablePokemons={avaliablePokemons}
          onSelected={mockOnSelected}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('BULBASAUR'));
    expect(mockOnSelected).lastCalledWith('1');

    fireEvent.click(screen.getByText('IVYSAUR'));
    expect(mockOnSelected).lastCalledWith('2');
  });

  test('highlights selected pokemon', () => {
    render(
      <ThemeProvider theme={theme}>
        <PokemonSelect avaliablePokemons={avaliablePokemons} selectedId={'1'} />
      </ThemeProvider>
    );
    expect(screen.getByText('BULBASAUR')).toHaveStyle('background: lightblue');
    expect(screen.getByText('IVYSAUR')).not.toHaveStyle(
      'background: lightblue'
    );
  });
});
