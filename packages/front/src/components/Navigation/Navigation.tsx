import { FC, useContext } from 'react';

import { AuthContext } from '../../context/authContext';
import { User, UserContext } from '../../context/userContext';
import { NavigationWrapper } from './Navigation.styles';

interface NavigationProps {
  handleLogout: () => void;
  user: User;
}

export const Navigation: FC<NavigationProps> = ({ handleLogout, user }) => {
  // const { user } = useContext(UserContext);

  return (
    <NavigationWrapper>
      <p data-testid='trainer-name'>Trener: {user && user.username}</p>
      <button data-testid='logout-button' onClick={handleLogout}>
        Zregeneruj się
      </button>
    </NavigationWrapper>
  );
};
