import { Route, Routes } from 'react-router';
import './App.css';
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
          <RequireAuth>
            <Route path='dogs' />
          </RequireAuth>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
