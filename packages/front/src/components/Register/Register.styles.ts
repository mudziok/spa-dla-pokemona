import styled from 'styled-components';

export const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  gap: 30px;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const ErrorWrapper = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;
  color: red;
`;
