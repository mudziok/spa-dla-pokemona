import { Route, Routes } from 'react-router';

import './index.css';
import { CatchPokemon } from './components/CatchPokemon/component';
import { Login } from './components/Login/component';
import { PokemonList } from './components/PokemonList/component';
import { RequireAuth } from './components/RequireAuth/component';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <>
      <h1>Spa dla pokemona</h1>
      <AuthProvider>
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
      </AuthProvider>
    </>
  );
}

export default App;
