import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { AxiosContext } from '../../context/axiosContext';
import { UserContext } from '../../context/userContext';
import { axiosPokeApi, AxiosPokeApiRoutes } from '../../utils/axiosPokeApi';
import { AxiosPrivateRoutes } from '../../utils/axiosPrivate';
import { Navigation } from '../Navigation/Navigation';
import { PokemonBrief, PokemonSelect } from '../PokemonSelect/component';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

export const CatchPokemon = () => {
  const navigate = useNavigate();

  const { axiosPrivate } = useContext(AxiosContext);
  const { setToken } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    console.log('logout');
    setToken('');
  };

  const [avaliablePokemons, setAvaliablePokemons] = useState<
    Array<PokemonBrief>
  >([]);

  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState('');
  const [pokedexNumber, setPokedexNumber] = useState<string | undefined>();
  const [error, setError] = useState('');

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);
  const handleTime = (e: ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  const coughtAt = date === '' || time === '' ? undefined : date + 'T' + time;

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
    console.log(name, pokedexNumber, coughtAt);
    axiosPrivate
      .post(AxiosPrivateRoutes.POKEMONS, {
        data: {
          name,
          pokedexNumber,
          coughtAt,
        },
      })
      .then(() => {
        console.log('navi');
        navigate('/pokemons');
      })
      .catch(() => {
        console.log('er');
        setError('Uzupełnij wszystkie pola');
      });
  };

  return (
    <>
      <Navigation handleLogout={handleLogout} user={user} />
      <form onSubmit={handleSubmit}>
        <Split
          sidebar={
            <Stack>
              <input
                placeholder='name'
                value={name}
                onChange={handleNickname}
                data-test-id='pokemon-name'
                data-testid='pokemon-name'
              />
              <input
                type='date'
                value={date}
                onChange={handleDate}
                data-test-id='pokemon-date'
                data-testid='pokemon-date'
              />
              <input
                type='time'
                value={time}
                onChange={handleTime}
                data-test-id='pokemon-time'
                data-testid='pokemon-time'
              />
              {error && <p data-testid='catch-pokemon-error'>{error}</p>}
              <button
                type='submit'
                data-test-id='catch-pokemon-button'
                data-testid='catch-pokemon-button'
              >
                Złap pokemona
              </button>
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
