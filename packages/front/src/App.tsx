import { Route, Routes } from 'react-router';

import './App.css';
import { AddDog } from './components/AddDog/component';
import { DogList } from './components/DogList/component';
import { Login } from './components/Login/component';
import { RequireAuth } from './components/RequireAuth/component';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <div className='App'>
      <h1>Spa dla psa</h1>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route
            path='/dogs'
            element={
              <RequireAuth>
                <DogList />
              </RequireAuth>
            }
          ></Route>
          <Route
            path='/addDog'
            element={
              <RequireAuth>
                <AddDog />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
