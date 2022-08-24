import axios from 'axios';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export const AddDog = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:1337/api/dogs',
        {
          data: {
            name: name,
            problem: description,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((data) => console.log(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder='name' onChange={handleName}></input>
      <textarea
        placeholder='description'
        onChange={handleDescription}
      ></textarea>
      <input type='data'></input>
      <button>Dodaj psa</button>
    </form>
  );
};
