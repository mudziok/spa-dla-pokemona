import { ChangeEvent, useContext, useState, MouseEvent } from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import { axiosPublic, AxiosPublicRoutes } from '../../utils/axiosPublic';
import { FormWrapper, RegisterWrapper } from './Register.styles';

export const Register = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUser = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  let navigate = useNavigate();

  const { setToken } = useContext(AuthContext);

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosPublic
      .post(AxiosPublicRoutes.REGISTER, {
        username: user,
        email: user,
        password: password,
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        setError('ups, something go wrong');
      });
  };

  return (
    <RegisterWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <div>
          <input
            placeholder='user name'
            type='text'
            onChange={handleUser}
            data-test-id='registration-login'
          ></input>
        </div>
        <div>
          <input
            placeholder='password'
            type='password'
            onChange={handlePassword}
            data-test-id='registration-password'
          ></input>
        </div>
        {error && <p data-test-id='register-error'>{error}</p>}
        <button data-test-id='registration-button'>Register</button>
      </FormWrapper>
      <Link to='/'>
        <button data-test-id='login-button'>Go to log in page</button>
      </Link>
    </RegisterWrapper>
  );
};
