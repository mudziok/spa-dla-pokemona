import { useState, MouseEvent, useContext, ChangeEvent } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const handleClick = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('login succes', user, password);
    axios
      .post('http://localhost:1337/api/auth/local', {
        identifier: user,
        password: password,
      })
      .then((response) => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        setToken(response.data.jwt);
        navigate('/pokemons');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error);
        setError(error.response.data.error.message);
      });
  };

  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Split
      sidebar={
        <Stack as='form' onSubmit={handleClick}>
          <input placeholder='user' type='text' onChange={handleUser}></input>
          <input
            placeholder='password'
            type='password'
            onChange={handlePassword}
          ></input>
          <button>Log in</button>
          {error && <p>{error}</p>}
        </Stack>
      }
    />
  );
};
