import { FC, Dispatch } from 'react';

import { Pokemon } from '../../types/pokemon';
import { PokemonItem, PokemonList } from './styles';

interface PokemonSelectProps {
  avaliablePokemons: Array<PokemonInfo>;
  selectedNumber?: number;
  setSelectedNumber: Dispatch<React.SetStateAction<number | undefined>>;
}

export type PokemonInfo = Pick<Pokemon, 'id' | 'name' | 'pokedexNumber'>;

export const PokemonSelect: FC<PokemonSelectProps> = ({
  avaliablePokemons,
  setSelectedNumber,
  selectedNumber,
}) => {
  return (
    <PokemonList>
      {avaliablePokemons.map(({ id, name, pokedexNumber }) => (
        <PokemonItem
          selected={pokedexNumber === selectedNumber}
          onClick={() => setSelectedNumber(pokedexNumber)}
          key={id}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`}
            alt={name}
          />
        </PokemonItem>
      ))}
    </PokemonList>
  );
};
