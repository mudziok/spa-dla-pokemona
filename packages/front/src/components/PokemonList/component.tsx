import { FC, useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { Pokemon } from '../../types/pokemon';
import { PokemonSelect } from '../PokemonSelect/component';
import { FlexCenteredColumn } from '../StyledComponent/mainStyled';

const API_URL = 'http://localhost:1337';

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
      <PokemonSelect
        avaliablePokemons={pokemons}
        onSelected={(id) => handleDelete(id)}
      />

      <Link to={'/catch'}>
        <button>Złap pokemona</button>
      </Link>
    </FlexCenteredColumn>
  );
};
