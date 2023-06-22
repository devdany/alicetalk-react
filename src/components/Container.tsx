import React from 'react';
import styled from 'styled-components';

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <ContainerBox className={className}>
      {children}
    </ContainerBox>
  );
}

export default Container;

const ContainerBox = styled.div`
  background-color: #ddd;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

`;
