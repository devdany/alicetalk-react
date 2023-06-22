import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Box from '../../components/Box';
import ChatItem from './ChatItem';

const Home: React.FC = () => {
  return (
    <Container>
      <HomeBox>
        <Header>
          <p>채팅</p>
          <AddButton>+</AddButton>
        </Header>
        <ChatsBox>
          <ChatItem chatId="1" />
          <ChatItem chatId="2" />
          <ChatItem chatId="3" />
          <ChatItem chatId="4" />
          <ChatItem chatId="5" />
          <ChatItem chatId="6" />
          <ChatItem chatId="7" />
          <ChatItem chatId="8" />
          <ChatItem chatId="9" />
          <ChatItem chatId="10" />
        </ChatsBox>
      </HomeBox>
    </Container>
  )
}

export default Home;

const HomeBox = styled(Box)`
  background-color: rgb(38, 38, 38);
`

const Header = styled.div`
  width: calc(100% - 40px);
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
`

const AddButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: 1px solid lightgray;
  color: lightgray;
  border-radius: 12px;
  font-size: 24px;
`

const ChatsBox = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  overflow-y: scroll;
  box-sizing: border-box;
`