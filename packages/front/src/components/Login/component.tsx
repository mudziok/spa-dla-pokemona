import axios from 'axios';
import React, { useState, MouseEvent } from 'react';

export const Login = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  //   useEffect(() => {
  //     axios
  //       .get('http://localhost:1337/api/')
  //       .then(({ data }) => console.log(data))
  //       .catch((error) => setError(error));
  //   }, []);

  // if (error) {
  //   // Print errors if any
  //   return <div>An error occured: {error.message}</div>;
  // }

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
    <form onClick={handleClick}>
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
