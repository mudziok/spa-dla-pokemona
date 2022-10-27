import { FC } from 'react';

import { Pokemon } from '../../types/pokemon';
import { getPokemonImageURL } from '../../utils/axiosPokeApi';
import { Navigation } from '../Navigation/Navigation';
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
    <PokemonList data-test-id='test-list-id'>
      {avaliablePokemons.map(({ id, name, pokedexNumber }) => (
        <PokemonItem
          selected={id === selectedId}
          onClick={() => onSelected(id)}
          key={id}
        >
          <img src={getPokemonImageURL(pokedexNumber)} alt={name} />
          {name.toUpperCase()}
        </PokemonItem>
      ))}
    </PokemonList>
  );
};
