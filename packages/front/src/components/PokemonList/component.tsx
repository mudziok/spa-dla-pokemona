import { FC, useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { Pokemon } from '../../types/pokemon';
import { FlexCenteredColumn, FlexLi } from '../StyledComponent/mainStyled';

const API_URL = 'http://localhost:1337';

const PokemonItem = ({ name, pokedexNumber, coughtAt }: Pokemon) => {
  return (
    <FlexLi>
      <div>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexNumber}.png`}
          alt={name}
        />
        <p>{name}</p>
        <p>{coughtAt.replace('T', ' ')}</p>
      </div>
    </FlexLi>
  );
};

export const PokemonList: FC = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const { token } = useContext(AuthContext);

  const watchAPI = useCallback(() => {
    axios
      .get(API_URL + '/api/pokemons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPokemons(response.data.data);
      });
  }, [token]);

  useEffect(() => {
    watchAPI();
  }, [watchAPI]);

  const handleDelete = (id: string) => {
    console.log(API_URL + `/api/pokemons/${id}`);
    axios
      .delete(API_URL + `/api/pokemons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => watchAPI());
  };

  return (
    <FlexCenteredColumn>
      <ul>
        {pokemons.map((pokemon) => (
          <>
            <PokemonItem key={pokemon.id} {...pokemon} />
            <button onClick={() => handleDelete(pokemon.id)}>
              Release Pokemon!
            </button>
          </>
        ))}
      </ul>

      <Link to={'/catch'}>
        <button>Złap pokemona</button>
      </Link>
    </FlexCenteredColumn>
  );
};
