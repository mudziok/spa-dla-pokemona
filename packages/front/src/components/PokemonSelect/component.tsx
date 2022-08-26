import { FC } from 'react';

import { Pokemon } from '../../types/pokemon';
import { PokemonItem, PokemonList } from './styles';

interface PokemonSelectProps {
  avaliablePokemons: Array<PokemonBrief>;
  selectedId?: string;
  onSelected?: (id: string) => void;
}

export type PokemonBrief = Pick<Pokemon, 'id' | 'name' | 'pokedexNumber'>;

export const PokemonSelect: FC<PokemonSelectProps> = ({
  avaliablePokemons,
  selectedId,
  onSelected = () => {},
}) => {
  return (
    <PokemonList>
      {avaliablePokemons.map(({ id, name, pokedexNumber }) => (
        <PokemonItem
          selected={id === selectedId}
          onClick={() => onSelected(id)}
          key={id}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`}
            alt={name}
          />
          {name.toUpperCase()}
        </PokemonItem>
      ))}
    </PokemonList>
  );
};
