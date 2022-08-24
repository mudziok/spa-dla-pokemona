import axios from 'axios';
import { FC, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { Dog } from '../../types/dog';

interface DogListProps {
  dogs: Array<Dog>;
}

const API_URL = 'http://localhost:1337';

const DogItem = ({ name, problem, photo }: Dog) => {
  return (
    <li>
      <img src={`${API_URL}${photo}`} alt={name} />
      {`${name} - ${problem}`}
    </li>
  );
};

export const DogList: FC = () => {
  const [dogs, setDogs] = useState<Array<Dog>>([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(API_URL + '/api/dogs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setDogs(response.data.dogs));
  }, [token]);
  return (
    <ul>
      {dogs.map((dog) => (
        <DogItem key={dog.id} {...dog} />
      ))}
    </ul>
  );
};
