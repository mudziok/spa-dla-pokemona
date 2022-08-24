import axios from 'axios';
import React, { useState, MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/authContext';

export const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
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
        navigate('/dogs');
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  };

  const handleUser = (e: any) => {
    setUser(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleClick}>
      <input placeholder='user' type='text' onChange={handleUser}></input>
      <input
        placeholder='password'
        type='password'
        onChange={handlePassword}
      ></input>
      <button>Log in</button>
    </form>
  );
};
