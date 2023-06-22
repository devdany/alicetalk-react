import React from 'react';
import styled from 'styled-components';

type BoxProps = {
  children?: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <BoxContainer className={className}>
      {children}
    </BoxContainer>
  )
}

export default Box;

const BoxContainer = styled.div`
  width: 400px;
  height: 85%;
  border-radius: 8px;
`