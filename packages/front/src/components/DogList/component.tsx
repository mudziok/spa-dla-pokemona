import { FC } from 'react';
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

export const DogList: FC<DogListProps> = ({ dogs }) => {
  return (
    <ul>
      {dogs.map((dog) => (
        <DogItem key={dog.id} {...dog} />
      ))}
    </ul>
  );
};
