import { Route, Routes } from 'react-router';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { CalendarInput } from './components/Calendar/component';
import { CatchPokemon } from './components/CatchPokemon/component';
import { Login } from './components/Login/component';
import { PokemonList } from './components/PokemonList/component';
import { RequireAuth } from './components/RequireAuth/component';
import { AuthProvider } from './context/authContext';
import { AxiosProvider } from './context/axiosContext';

const theme: DefaultTheme = {
  colors: {
    main: 'lightblue',
    secondary: 'white',
  },
};

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/calendar' element={<CalendarInput />} />
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
        </ThemeProvider>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
