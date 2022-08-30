import { Route, Routes } from 'react-router';

import { CatchPokemon } from './components/CatchPokemon/component';
import { Login } from './components/Login/component';
import { PokemonList } from './components/PokemonList/component';
import { RequireAuth } from './components/RequireAuth/component';
import { AuthProvider } from './context/authContext';
import { AxiosProvider } from './context/axiosContext';

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <Routes>
          <Route path='/' element={<Login />} />
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
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
