import { FC } from 'react';

import { User } from '../../context/userContext';
import { NavigationWrapper } from './Navigation.styles';

interface NavigationProps {
  handleLogout: () => void;
  user: User | null;
}

export const Navigation: FC<NavigationProps> = ({ handleLogout, user }) => {
  return (
    <NavigationWrapper>
      <p data-testid='trainer-name'>Trener: {user && user.username}</p>
      <button data-testid='logout-button' onClick={handleLogout}>
        Zregeneruj się
      </button>
    </NavigationWrapper>
  );
};
