import axios from 'axios';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

export const AddDog = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [registration, setRegistration] = useState('');
  const [time, setTime] = useState('');

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };
  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    setRegistration(date + 'T' + time);
  }, [date, time]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:1337/api/dogs',
        {
          data: {
            name: name,
            problem: description,
            registration: registration,
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
      <input type='date' onChange={handleDate}></input>
      <input type='time' onChange={handleTime}></input>
      <button>Dodaj psa</button>
    </form>
  );
};
