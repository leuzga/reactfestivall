import { useState } from 'react';
import styled from 'styled-components';
import sendEmail from './SendEmail';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled.form`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 0.3rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #795af6;
  }
`;

const SubmitButton = styled.button`
  background-color: #795af6;
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6646d1;
  }
`;

const SendEmailForm = () => {
  const [to_name, setToName] = useState('');

  const handleSubmit = () => {
    sendEmail(to_name);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type='email'
          placeholder='email destinatario'
          value={to_name}
          onChange={(e) => setToName(e.target.value)}
          required
        />
        <SubmitButton type='button' onClick={handleSubmit}>
          Enviar correo electrónico
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default SendEmailForm;
