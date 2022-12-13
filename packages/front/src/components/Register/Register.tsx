import { ChangeEvent, useState, MouseEvent } from 'react';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { axiosPublic, AxiosPublicRoutes } from '../../utils/axiosPublic';
import { ErrorWrapper, FormWrapper, RegisterWrapper } from './Register.styles';

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
        console.log(error);
        setError(error.response.data.error.message);
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
            data-testid='registration-login'
          ></input>
        </div>
        <div>
          <input
            placeholder='password'
            type='password'
            onChange={handlePassword}
            data-test-id='registration-password'
            data-testid='registration-password'
          ></input>
        </div>
        {error && (
          <ErrorWrapper
            data-test-id='register-error'
            data-testid='registration-error'
          >
            {error}
          </ErrorWrapper>
        )}
        <button
          data-test-id='registration-button'
          data-testid='registration-button'
        >
          Register
        </button>
      </FormWrapper>
      <Link to='/'>
        <button
          data-test-id='login-button-redirect'
          data-testid='login-button-redirect'
        >
          Go to log in page
        </button>
      </Link>
    </RegisterWrapper>
  );
};
