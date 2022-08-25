import { ChangeEvent, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { PokemonSelect } from '../PokemonSelect/components';
import { GridForm } from '../StyledComponent/mainStyled';
import { CatchPokemonTable } from './styles';

export const CatchPokemon = () => {
  const { token } = useContext(AuthContext);
  const [nickname, setNickname] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [pokedexNumber, setPokedexNumber] = useState<number | undefined>();
  const [coughtAt, setCoughtAt] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) =>
    setNickname(e.target.value);
  const handleDate = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);
  const handleTime = (e: ChangeEvent<HTMLInputElement>) =>
    setTime(e.target.value);

  useEffect(() => {
    setCoughtAt(date + 'T' + time);
  }, [date, time]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:1337/api/pokemons',
        {
          data: {
            nickname,
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
    <GridForm onSubmit={handleSubmit}>
      <CatchPokemonTable>
        <input
          placeholder='name'
          value={nickname}
          onChange={handleNickname}
        ></input>
        <input type='date' onChange={handleDate}></input>
        <input type='time' onChange={handleTime}></input>

        <button>Złap pokemona</button>
      </CatchPokemonTable>
      <PokemonSelect
        selectedNumber={pokedexNumber}
        setSelectedNumber={setPokedexNumber}
      />
    </GridForm>
  );
};
