import { useState } from 'react';

import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../App';
import { AuthContext, AuthProvider } from '../../context/authContext';
import { AxiosContext, AxiosProvider } from '../../context/axiosContext';
import { composeProviders } from '../../context/composeProviders';
import { OnlineProvider } from '../../context/onlineContext';
import {
  User,
  UserContext,
  UserContextProvider,
} from '../../context/userContext';
import { axiosPokeApi } from '../../utils/axiosPokeApi';
import { axiosPrivate } from '../../utils/axiosPrivate';
import { axiosPublic } from '../../utils/axiosPublic';
import { Navigation } from './Navigation';

export const mockedFunction = jest.fn();

// jest.mock('react-router', () => ({
//   ...(jest.requireActual('react-router') as any),
//   useNavigate: () => mockedFunction,
// }));

const mockSignOutSpy = jest.fn();

// const URL = 'http://localhost:3000/pokemons';
const mockUser = {
  id: 1,
  username: 'Przemek',
  email: 'przemek@gmail.com',
  password: '123456',
  confirmed: true,
};

// export const server = setupServer(
//   rest.get(URL, async (req, res, ctx) => {
//     const data = await req.json();

//     return res(
//       ctx.json({
//         jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390',
//         user: {
//           id: 1,
//           username: 'Przemek',
//           email: 'przemek@gmail.com',
//           provider: 'local',
//           confirmed: true,
//           blocked: false,
//           createdAt: '2022-08-24T08:51:05.616Z',
//           updatedAt: '2022-08-24T12:11:11.364Z',
//         },
//       }),
//       ctx.cookie('auth-token', 'abc-123')
//     );
//   })
// );

const ComposedProviders = composeProviders([
  AuthProvider,
  AxiosProvider,
  OnlineProvider,
  UserContextProvider,
]);

// const MockNavigationComponent = () => {
//   const [token, setToken] = useState(
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390'
//   );
//   const value = { token, setToken };
//   const [user, setUser] = useState<User | null>(mockUser);
//   return (
//     <BrowserRouter>
//       <AuthContext.Provider value={value}>
//         <AxiosContext.Provider
//           value={{ axiosPublic, axiosPokeApi, axiosPrivate }}
//         >
//           <UserContext.Provider value={{ user }}>
//             <ThemeProvider theme={theme}>
//               <ComposedProviders>
//                 <Navigation />
//               </ComposedProviders>
//             </ThemeProvider>
//           </UserContext.Provider>
//         </AxiosContext.Provider>
//       </AuthContext.Provider>
//     </BrowserRouter>
//   );
// };
// jest.mock('./Navigation', () => ({
//   handleLogout: jest.fn(),
// }));

const MockNavigationComponent = ({
  handleLogout,
  user,
}: {
  handleLogout: () => void;
  user: User;
}) => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxNTA2ODQwLCJleHAiOjE2NjQwOTg4NDB9.Ki6dcrhXYJa7_HVk8MzCtzaqse710IpGWcNnwNvQ390'
  );
  const value = { token, setToken };
  const [user, setUser] = useState<User | null>(mockUser);
  return (
    <AuthContext.Provider value={value}>
      <UserContext.Provider value={{ user }}>
        <ThemeProvider theme={theme}>
          <ComposedProviders>
            <Navigation handleLogout={handleLogout} />
          </ComposedProviders>
        </ThemeProvider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

const handleLogout = jest.fn();

describe('Logout', () => {
  test('component is rendered', async () => {
    render(<MockNavigationComponent handleLogout={handleLogout} />);

    expect(await screen.findByTestId('logout-button')).toBeInTheDocument();
    expect(await screen.findByTestId('trainer-name')).toBeInTheDocument();
    expect(await screen.findByText('Trener:')).toBeInTheDocument();
  });

  test('function is working', async () => {
    const handleLogout = jest.fn();

    render(<MockNavigationComponent handleLogout={handleLogout} />);

    const btn = await screen.findByTestId('logout-button');
    fireEvent.click(btn);
    expect(handleLogout).toHaveBeenCalled();
  });
});
