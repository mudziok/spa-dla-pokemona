import { ChangeEvent, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router';

import { AuthContext } from '../../context/authContext';
import { FlexCenteredColumn } from '../StyledComponent/mainStyled';

export const AddDog = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [registration, setRegistration] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

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
      .then(() => navigate('/dogs'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FlexCenteredColumn>
        <input placeholder='name' onChange={handleName}></input>
        <textarea
          placeholder='description'
          onChange={handleDescription}
        ></textarea>
        <input type='date' onChange={handleDate}></input>
        <input type='time' onChange={handleTime}></input>
        <button>Dodaj psa</button>
      </FlexCenteredColumn>
    </form>
  );
};
