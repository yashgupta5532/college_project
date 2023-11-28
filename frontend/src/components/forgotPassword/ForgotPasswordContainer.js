import styled from 'styled-components';

const ForgotPasswordContainer = styled.div`
  max-width: 800px;
  min-height:400px;
  margin:  10% auto;
  padding: 3vmax;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f8f8f8;
  text-align: center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 16px;
  }

  p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  input {
    width: 100%;
    padding: 17px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  p.message {
    font-size: 1rem;
    margin-top: 10px;
    color: #ff0000;
  }
`;

export default ForgotPasswordContainer;
