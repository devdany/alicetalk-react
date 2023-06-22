import React from 'react';
import styled from 'styled-components'
import Container from '../../components/Container';
import Box from '../../components/Box';
import ChatProfile from '../../components/ChatProfile';
import UserIcon from '../../icons/user.svg';
import MessageItem from './MessageItem';

const Chat: React.FC = () => {
  const messagesRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);
  
  return (
    <Container>
      <ChatBox>
        <ChatHeader>
          <ChatHeaderLeft>
            <ChatProfile />
            <ChatHeaderContentBox>
              <Title>dany, heidi, rookie...</Title>
              <UserCountBox>
                <UserIconImg src={UserIcon} />
                <UserCount>2</UserCount>
              </UserCountBox>
            </ChatHeaderContentBox>
          </ChatHeaderLeft>
        </ChatHeader>
        <Divider />
        <MessagesBox ref={messagesRef}>
          <MessageItem senderId='heidi' body='hello' relay={false} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='me' body='hello hello' relay={false} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='wow' relay={false} createdAt={new Date('2023-06-22')} relayStart />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='me' body='haha' relay={true} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='me' body='haha' relay={false} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='heidi' body='hello' relay={false} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='me' body='hello hello' relay={false} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='wow' relay={false} createdAt={new Date('2023-06-22')} relayStart />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='me' body='haha' relay={true} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='me' body='haha' relay={false} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='heidi' body='hello' relay={false} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='me' body='hello hello' relay={false} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='wow' relay={false} createdAt={new Date('2023-06-22')} relayStart />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} />
          <MessageItem senderId='heidi' body='hello' relay={true} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='me' body='haha' relay={true} createdAt={new Date('2023-06-22')} relayLast />
          <MessageItem senderId='me' body='haha' relay={false} createdAt={new Date('2023-06-22')} relayLast />
        </MessagesBox>
        <Divider />
        <SendMessageBox>
          <TextArea />
          <SendButton>전송</SendButton>
        </SendMessageBox>
      </ChatBox>
    </Container>
  )
}

export default Chat;

const ChatBox = styled(Box)`
  height: 90%;
`

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(64, 64, 64);
`

const ChatHeader = styled.div`
  width: calc(100% - 40px);
  height: 80px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgb(46, 46, 46);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`

const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const ChatHeaderContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  margin-left: 12px;
`

const Title = styled.span`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`

const UserCountBox = styled.div`
  color: lightgray;
  display: flex;
  gap: 2px;
  align-items: center;
  height: 24px;
`;

const UserIconImg = styled.img`
  width: 16px;
  height: 16px;
`

const UserCount = styled.span`
  color: lightgray;
  font-size: 12px;
  font-weight: 400;
  margin-top: 2px;
`

const MessagesBox = styled.div`
  width: 100%;
  background-color: rgb(25, 25, 25);
  height: calc(100% - 206px);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 8px;
  padding-bottom: 20px;
`

const SendMessageBox = styled.div`
  width: calc(100% - 24px);
  height: 80px;
  background-color: rgb(38, 38, 38);
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  align-items: center;
  padding: 12px;
  gap: 8px;
`

const TextArea = styled.textarea`
  flex: 1;
  height: 80px;
  resize: none;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
`

const SendButton = styled.button`
  flex: 0 0 80px;
  height: 72px;
  background-color: rgb(45, 45, 45);
  color: rgb(91, 91, 91);
  border-radius: 8px;
  border: 1px solid rgb(64, 64, 64);
`