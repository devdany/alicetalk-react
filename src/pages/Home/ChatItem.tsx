import React from 'react';
import styled from 'styled-components';
import ChatProfile from '../../components/ChatProfile';
import { useNavigate, useNavigation } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useChatItemQuery } from '../../generated/graphql';
import { dateFormatter } from '../../utils/dateFormatter';

type ChatItemProps = {
  chatId: string;
}

gql`
  query chatItem($chatId: ID!) {
    chat(id: $chatId) {
      id
      members {
        id
        email
      }
      messages {
        id
        body
        createdAt
      }
    }
  }
`

const ChatItem: React.FC<ChatItemProps> = ({ chatId }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useChatItemQuery({
    variables: {
      chatId
    }
  });

  const membersAsChatTitle = React.useMemo(() => {
    if (!data?.chat) {
      return '';
    }

    return data.chat.members.map(member => member.email.split('@')[0]).join(', ');
  }, [data])

  const lastMessage = React.useMemo(() => {
    if (!data?.chat) {
      return null;
    }
    
    const message = data.chat.messages[data.chat.messages.length - 1]

    return {
      body: message ? message.body : '',
      createdAt: message ? dateFormatter(new Date(message.createdAt)) : ''
    }
  }, [data])

  if (loading) {
    return (
      <LadingBox>
        <p>로딩중...</p>
      </LadingBox>
    )
  }

  if (!data?.chat || error) {
    return null;
  }

  return (
    <ChatItemBox onClick={() => navigate(`/chat/${chatId}`)}>
      <LeftBox>
        <ChatProfile />
        <ContentBox>
          <Title>{membersAsChatTitle}...</Title>
          <LatestChat>{lastMessage?.body}</LatestChat>
        </ContentBox>
      </LeftBox>
      <RightBox>
        <LastMessageCreatedAt>{lastMessage?.createdAt}</LastMessageCreatedAt>
      </RightBox>
    </ChatItemBox>
  )
}

export default ChatItem;


const ChatItemBox = styled.div`
  width: calc(100%-20px);
  height: 90px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: rgb(46, 46, 46);
  }
`;

const LadingBox = styled.div`
  width: calc(100%-20px);
  height: 90px;
  justify-content: center;
  align-items: center;
`

const LeftBox = styled.div`
  display: flex;
`

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  margin-left: 12px;
`

const Title = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`

const LatestChat = styled.span`
  color: lightgray;
  font-size: 12px;
  font-weight: 400;
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LastMessageCreatedAt = styled.span`
  color: lightgray;
  font-size: 12px;
  font-weight: 400;
`