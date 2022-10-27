import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { AxiosContext } from '../../context/axiosContext';
import { axiosPokeApi, AxiosPokeApiRoutes } from '../../utils/axiosPokeApi';
import { AxiosPrivateRoutes } from '../../utils/axiosPrivate';
import { Navigation } from '../Navigation/Navigation';
import { PokemonBrief, PokemonSelect } from '../PokemonSelect/component';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

export const CatchPokemon = () => {
  const navigate = useNavigate();

  const { axiosPrivate } = useContext(AxiosContext);

  const [avaliablePokemons, setAvaliablePokemons] = useState<
    Array<PokemonBrief>
  >([]);

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState('');
  const [pokedexNumber, setPokedexNumber] = useState<string | undefined>();

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);
  const handleTime = (e: ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  const coughtAt = date + 'T' + time;

  useEffect(() => {
    const fetchAvaliablePokemons = async () => {
      const data = await axiosPokeApi
        .get(AxiosPokeApiRoutes.POKEDEX_GEN_1)
        .then(({ data }) => data.results as Array<{ name: string }>);

      const pokemons: Array<PokemonBrief> = data.map(({ name }, index) => ({
        id: (index + 1).toString(),
        name,
        pokedexNumber: index + 1,
      }));

      setAvaliablePokemons(pokemons);
    };
    fetchAvaliablePokemons();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosPrivate
      .post(AxiosPrivateRoutes.POKEMONS, {
        data: {
          name,
          pokedexNumber,
          coughtAt,
        },
      })
      .then(() => navigate('/pokemons'));
  };

  return (
    <>
      <Navigation />
      <form onSubmit={handleSubmit}>
        <Split
          sidebar={
            <Stack>
              <input
                placeholder='name'
                value={name}
                onChange={handleNickname}
                data-test-id='pokemon-name'
              />
              <input
                type='date'
                value={date}
                onChange={handleDate}
                data-test-id='pokemon-date'
              />
              <input
                type='time'
                value={time}
                onChange={handleTime}
                data-test-id='pokemon-time'
              />
              <button data-test-id='catch-pokemon-button'>Złap pokemona</button>
            </Stack>
          }
          main={
            <PokemonSelect
              avaliablePokemons={avaliablePokemons}
              selectedId={pokedexNumber}
              onSelected={(id) => setPokedexNumber(id)}
            />
          }
        />
      </form>
    </>
  );
};
