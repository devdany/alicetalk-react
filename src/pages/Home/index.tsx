import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import Box from '../../components/Box';
import ChatItem from './ChatItem';
import { useLoggedIn } from '../../hooks/loggedIn';
import Login from '../Login';
import { gql } from '@apollo/client';
import { useCreateChatMutation, useMeQuery } from '../../generated/graphql';

gql`
  mutation createChat($memberIds: [ID!]) {
    createChat(memberIds: $memberIds) {
      id
    }
  }
`

gql`
  query me {
    me {
      id
      email
      chats {
        id
      }
    }
  }
`

const Home: React.FC = () => {
  const loggedIn = useLoggedIn();
  const meQuery = useMeQuery({
    skip: !loggedIn
  });
  const [createChat] = useCreateChatMutation({
    update(cache, { data }) {
      if (!data?.createChat || !meQuery.data?.me) {
        return;
      }

      cache.modify({
        id: `User:${meQuery.data.me.id}`,
        fields: {
          chats(existingChats = []) {
            const newChatRef = cache.writeFragment({
              data: data.createChat,
              fragment: gql`
                fragment NewChat on Chat {
                  id
                }
              `
            });

            return [...existingChats, newChatRef];
          }
        }
      })
    }
  });
  

  const handleClickCreateChat = () => {
    if (!meQuery.data?.me) {
      return;
    }

    createChat({
      variables: {
        memberIds: ['1', '2', '3'].filter(id => id !== meQuery.data?.me?.id)
      }
    })
  }

  const chats = React.useMemo(() => {
    if (meQuery.loading) {
      return <p>로딩중...</p>
    }

    if (!meQuery.data?.me || meQuery.error) {
      return <p>에러 발생</p>
    }

    if (meQuery.data.me.chats.length === 0) {
      return <p>채팅이 없습니다.</p>
    }

    return meQuery.data.me.chats.map(chat => <ChatItem key={`chat-${chat.id}`} chatId={chat.id} />)
  }, [meQuery])

  if (!loggedIn) {
    return <Login />
  }

  return (
    <Container>
      <HomeBox>
        <Header>
          <p>채팅</p>
          <AddButton onClick={handleClickCreateChat} >+</AddButton>
        </Header>
        <ChatsBox>
          {chats}
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