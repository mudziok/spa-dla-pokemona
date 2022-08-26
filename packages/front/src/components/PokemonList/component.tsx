import { FC, useCallback, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { Pokemon } from '../../types/pokemon';
import { PokemonSelect } from '../PokemonSelect/component';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

const API_URL = 'http://localhost:1337';

export const PokemonList: FC = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const { token } = useContext(AuthContext);
  let navigate = useNavigate();

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
    <Split
      main={
        <PokemonSelect
          avaliablePokemons={pokemons}
          onSelected={(id) => handleDelete(id)}
        />
      }
      sidebar={
        <Stack>
          <button onClick={() => navigate('/catch')}>Złap pokemona</button>
        </Stack>
      }
    />
  );
};
