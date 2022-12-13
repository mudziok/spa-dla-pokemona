import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { User } from '../../context/userContext';
import { Navigation } from './Navigation';

export const mockedFunction = jest.fn();
const mockLogout = jest.fn();

const mockUser = {
  id: 1,
  username: 'Przemek',
  email: 'przemek@gmail.com',
  password: '123456',
  confirmed: true,
};

const MockNavigationComponent = ({
  handleLogout,
  user,
}: {
  handleLogout: () => void;
  user: User;
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Navigation handleLogout={handleLogout} user={user} />
    </ThemeProvider>
  );
};

const mockUserNavigation = (
  <MockNavigationComponent handleLogout={mockLogout} user={mockUser} />
);

describe('Logout', () => {
  test('component is rendered', async () => {
    render(mockUserNavigation);

    expect(await screen.findByTestId('logout-button')).toBeInTheDocument();
    expect(await screen.findByTestId('trainer-name')).toBeInTheDocument();
    expect(await screen.findByText('Trener: Przemek')).toBeInTheDocument();
  });

  test('function is working', async () => {
    render(mockUserNavigation);

    const btn = await screen.findByTestId('logout-button');
    fireEvent.click(btn);
    expect(mockLogout).toHaveBeenCalled();
  });
});
