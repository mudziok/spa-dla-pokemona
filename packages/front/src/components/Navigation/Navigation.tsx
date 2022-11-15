import { useContext } from 'react';

import { AuthContext } from '../../context/authContext';
import { UserContext } from '../../context/userContext';
import { NavigationWrapper } from './Navigation.styles';

export const Navigation = () => {
  const { user } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);

  const handleLogout = () => {
    setToken('');
  };

  return (
    <NavigationWrapper>
      <p data-testid='trainer name'>Trener: {user && user.username}</p>
      <button data-testid='logout-button' onClick={handleLogout}>
        Zregeneruj się
      </button>
    </NavigationWrapper>
  );
};
