import { FC, useState, Dispatch, useEffect } from 'react';

import axios from 'axios';

import { PokemonItem, PokemonList } from './styles';

interface PokemonSelectProps {
  selectedNumber?: number;
  setSelectedNumber: Dispatch<React.SetStateAction<number | undefined>>;
}

interface PokemonInfo {
  name: string;
  pokedexNumber: number;
}

export const PokemonSelect: FC<PokemonSelectProps> = ({
  setSelectedNumber,
  selectedNumber,
}) => {
  const [avaliablePokemons, setAvaliablePokemons] = useState<
    Array<PokemonInfo>
  >([]);

  useEffect(() => {
    const fetchAvaliablePokemons = async () => {
      const data = await axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(({ data }) => data.results as Array<{ name: string }>);

      console.log(data);
      const infos: Array<PokemonInfo> = data.map(({ name }, index) => ({
        pokedexNumber: index + 1,
        name,
      }));

      setAvaliablePokemons(infos);
    };
    fetchAvaliablePokemons();
  }, []);

  return (
    <PokemonList>
      {avaliablePokemons.map(({ name, pokedexNumber }) => (
        <PokemonItem
          selected={pokedexNumber === selectedNumber}
          onClick={() => setSelectedNumber(pokedexNumber)}
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
