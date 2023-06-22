import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Box from '../../components/Box';


const Login: React.FC = () => {
  return (
    <Container>
      <LoginBox>
        <Logo src='https://elice.io/images/elice_logo.svg' />
        <InputBox>
          <Input placeholder="이메일" style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
          <InputDivider />
          <Input placeholder="비밀번호" style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />
        </InputBox>
        <LoginButton>로그인</LoginButton>
      </LoginBox>
    </Container>
  )
}

export default Login;

const LoginBox = styled(Box)`
  background-color: rgb(115, 83, 234);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`

const InputBox = styled.div`
  width: 340px;
  margin-top: 24px;
  flex-direction: column;
  border-radius: 8px;
  box-sizing: border-box;
`

const InputDivider = styled.div`
  height: 1px;
  background-color: #ddd;
  width: 100%;
`

const Input = styled.input`
  width: calc(100% - 16px);
  height: 42px;
  border: none;
  padding: 0 8px;
  outline: none;
`

const LoginButton = styled.button`
  width: 340px;
  height: 42px;
  border: 1px solid #ddd;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`