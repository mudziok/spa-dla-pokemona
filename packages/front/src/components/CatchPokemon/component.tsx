import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { PokemonBrief, PokemonSelect } from '../PokemonSelect/component';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

export const CatchPokemon = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [pokedexNumber, setPokedexNumber] = useState<string | undefined>();
  const [coughtAt, setCoughtAt] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);
  const handleTime = (e: ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  useEffect(() => {
    setCoughtAt(date + 'T' + time);
  }, [date, time]);

  const [avaliablePokemons, setAvaliablePokemons] = useState<
    Array<PokemonBrief>
  >([]);

  useEffect(() => {
    const fetchAvaliablePokemons = async () => {
      const data = await axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=151')
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
    axios
      .post(
        'http://localhost:1337/api/pokemons',
        {
          data: {
            name,
            pokedexNumber,
            coughtAt,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => navigate('/pokemons'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Split
        sidebar={
          <Stack>
            <input
              placeholder='name'
              value={name}
              onChange={handleNickname}
            ></input>
            <input type='date' value={date} onChange={handleDate}></input>
            <input type='time' value={time} onChange={handleTime}></input>

            <button>Złap pokemona</button>
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
  );
};
