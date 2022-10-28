import { Route, Routes } from 'react-router';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { CatchPokemon } from './components/CatchPokemon/component';
import { Login } from './components/Login/component';
import { PokemonList } from './components/PokemonList/component';
import { Register } from './components/Register/Register';
import { RequireAuth } from './components/RequireAuth/component';
import { AuthProvider } from './context/authContext';
import { AxiosProvider } from './context/axiosContext';
import { ContextProvider } from './context/composeProviders';
import { OnlineProvider } from './context/onlineContext';
import { UserContextProvider } from './context/userContext';

export const theme: DefaultTheme = {
  colors: {
    main: 'lightblue',
    secondary: 'white',
  },
};

const composeProviders = (providers: Array<ContextProvider>) => {
  const ComposedProvider: ContextProvider = ({ children }) =>
    providers.reduceRight((Prev, Curr) => <Curr children={Prev} />, children);
  return ComposedProvider;
};

const ComposedProviders = composeProviders([
  AuthProvider,
  AxiosProvider,
  OnlineProvider,
  UserContextProvider,
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ComposedProviders>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/pokemons'
            element={
              <RequireAuth>
                <PokemonList />
              </RequireAuth>
            }
          ></Route>
          <Route
            path='/catch'
            element={
              <RequireAuth>
                <CatchPokemon />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </ComposedProviders>
    </ThemeProvider>
  );
}

export default App;
