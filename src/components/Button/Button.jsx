import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #0051a2;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Button = ({ children, onClick, disabled, ...props }) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button; 