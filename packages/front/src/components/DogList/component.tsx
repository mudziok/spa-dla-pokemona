import { FC, useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { Dog } from '../../types/dog';
import { FlexCenteredColumn, FlexLi } from '../StyledComponent/mainStyled';

const API_URL = 'http://localhost:1337';

const DogItem = ({ name, problem, photo, registration }: Dog) => {
  return (
    <FlexLi>
      <img src={`${API_URL}${photo}`} alt={name} />
      <div>
        <p>{`${name} - ${problem}`}</p>
        <p>{registration.replace('T', ' ')}</p>
      </div>
    </FlexLi>
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
      .then((response) => {
        console.log(response);
        setDogs(response.data.dogs);
      });
  }, [token]);

  return (
    <FlexCenteredColumn>
      <ul>
        {dogs.map((dog) => (
          <DogItem key={dog.id} {...dog} />
        ))}
      </ul>

      <Link to={'/addDog'}>
        <button>Dodaj psa</button>
      </Link>
    </FlexCenteredColumn>
  );
};
