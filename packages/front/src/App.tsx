import { Route, Routes } from 'react-router';
import styled from 'styled-components';

import './index.css';
import { CatchPokemon } from './components/CatchPokemon/component';
import { Login } from './components/Login/component';
import { PokemonList } from './components/PokemonList/component';
import { RequireAuth } from './components/RequireAuth/component';
import { AuthProvider } from './context/authContext';

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
`;

const MiddleRow = styled.div`
  max-width: 400px;
`;

function App() {
  return (
    <StyledApp>
      <MiddleRow>
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
      </MiddleRow>
    </StyledApp>
  );
}

export default App;
