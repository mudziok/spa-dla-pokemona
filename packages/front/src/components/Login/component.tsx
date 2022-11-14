import { useState, MouseEvent, useContext, ChangeEvent } from 'react';

import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { AxiosContext } from '../../context/axiosContext';
import { AxiosPublicRoutes } from '../../utils/axiosPublic';
import { Split } from '../Split/component';
import { Stack } from '../Stack/component';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();

  const { setToken } = useContext(AuthContext);
  const { axiosPublic } = useContext(AxiosContext);

  const handleClick = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosPublic
      .post(AxiosPublicRoutes.LOGIN, {
        identifier: user,
        password: password,
      })
      .then((response) => {
        setToken(response.data.jwt);
        navigate('/pokemons');
      })
      .catch((error) => {
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
          <input
            placeholder='user'
            type='text'
            onChange={handleUser}
            data-test-id='login'
            data-testid='login'
          ></input>
          <input
            placeholder='password'
            type='password'
            onChange={handlePassword}
            data-test-id='password'
            data-testid='password'
          ></input>
          <button data-testid='login-button' data-test-id='login-button'>
            Log in
          </button>
          {error && (
            <p data-testid='login-error' data-test-id='login-error'>
              {error}
            </p>
          )}
          <button onClick={() => navigate('/register')}>
            Create an account
          </button>
        </Stack>
      }
    />
  );
};
