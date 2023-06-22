import React from 'react';
import styled from 'styled-components';
import ChatProfile from '../../components/ChatProfile';
import { useNavigate, useNavigation } from 'react-router-dom';

type ChatItemProps = {
  chatId: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatId }) => {
  const navigate = useNavigate();
  return (
    <ChatItemBox onClick={() => navigate(`/chat/${chatId}`)}>
      <LeftBox>
        <ChatProfile />
        <ContentBox>
          <Title>dany, heidi, rookie...</Title>
          <LatestChat>안녕하세요</LatestChat>
        </ContentBox>
      </LeftBox>
      <RightBox>
        <LastMessageCreatedAt>오후3:30</LastMessageCreatedAt>
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