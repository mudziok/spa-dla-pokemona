import { FC, useCallback, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { AxiosContext } from '../../context/axiosContext';
import { Pokemon } from '../../types/pokemon';
import { AxiosPrivateRoutes } from '../../utils/axiosPrivate';
import { Navigation } from '../Navigation/Navigation';
import { PokemonSelect } from '../PokemonSelect/component';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

export const PokemonList: FC = () => {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

  const { axiosPrivate } = useContext(AxiosContext);

  let navigate = useNavigate();

  const watchAPI = useCallback(() => {
    axiosPrivate.get(AxiosPrivateRoutes.POKEMONS).then((response) => {
      setPokemons(response.data.data);
    });
  }, [axiosPrivate]);

  const handleDelete = (id: string) => {
    axiosPrivate
      .delete(AxiosPrivateRoutes.POKEMONS + `/${id}`)
      .then(() => watchAPI());
  };

  useEffect(() => {
    watchAPI();
  }, [watchAPI]);

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
          <button
            onClick={() => navigate('/catch')}
            data-test-id='catch-button'
          >
            Złap pokemona
          </button>
          <Navigation />
        </Stack>
      }
    />
  );
};
