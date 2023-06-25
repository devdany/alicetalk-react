import React from 'react';
import styled from 'styled-components'
import Container from '../../components/Container';
import Box from '../../components/Box';
import ChatProfile from '../../components/ChatProfile';
import UserIcon from '../../icons/user.svg';
import MessageItem from './MessageItem';
import { gql } from '@apollo/client';
import { useChatQuery, useSendMessageMutation } from '../../generated/graphql';
import { useParams } from 'react-router-dom';
import { isSameDate } from '../../utils/dateFormatter';

gql`
  query chat($chatId: ID!) {
    chat(id: $chatId) {
      id
      members {
        id
        email
      }
      messages {
        id
        sender {
          id
          email
        }
        body
        createdAt
      }
    }
  }
`

gql`
  mutation sendMessage($chatId: ID!, $body: String!) {
    sendMessage(chatId: $chatId, body: $body) {
      id
      sender {
        id
        email
      }
      body
      createdAt
    }
  }
`


const Chat: React.FC = () => {
  const messagesRef = React.useRef<HTMLDivElement>(null);
  const params = useParams<{ chatId: string }>();
  const [body, setBody] = React.useState<string>();
  const { data, loading, error } = useChatQuery({
    variables: {
      chatId: params.chatId ? params.chatId : '',
    },
    skip: !params.chatId
  })
  
  const [sendMessage, sendMessageResult] = useSendMessageMutation({
    update(cache, { data }) {
      if (!data?.sendMessage || !params.chatId) {
        return;
      }

      cache.modify({
        id: `Chat:${params.chatId}`,
        fields: {
          messages(existingMessages = []) {
            const newMessageRef = cache.writeFragment({
              data: data.sendMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  sender {
                    id
                    email
                  }
                  body
                  createdAt
                }
              `
            })

            return [...existingMessages, newMessageRef];
          }
        }
      })
    },
    onCompleted() {
      setBody('');
      setTimeout(() => {
        messagesRef.current?.scrollTo({
          top: messagesRef.current.scrollHeight,
        })
      }, 100)
    },
  });

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  const membersAsChatTitle = React.useMemo(() => {
    if (!data?.chat) {
      return '';
    }

    return data.chat.members.map(member => member.email.split('@')[0]).join(', ');
  }, [data])

  const handleClickSubmit = () => {
    if (sendMessageResult.loading) {
      return;
    }

    if (!body) {
      return;
    }

    sendMessage({
      variables: {
        chatId: params.chatId ? params.chatId : '',
        body,
      }
    })
  }

  if (loading) {
    return (
      <Container>
        로딩중..
      </Container>
    )
  }

  if (!data?.chat || error) {
    return (
      <Container>
        채팅정보를 로드하는데 실패했습니다.
      </Container>
    )
  }

  return (
    <Container>
      <ChatBox>
        <ChatHeader>
          <ChatHeaderLeft>
            <ChatProfile />
            <ChatHeaderContentBox>
              <Title>{membersAsChatTitle}...</Title>
              <UserCountBox>
                <UserIconImg src={UserIcon} />
                <UserCount>{data.chat.members.length}</UserCount>
              </UserCountBox>
            </ChatHeaderContentBox>
          </ChatHeaderLeft>
        </ChatHeader>
        <Divider />
        <MessagesBox ref={messagesRef}>
          {data.chat.messages.map((message, index) => {
            if (!data.chat) {
              return null
            }
            // relay 로직
            /*
              현재 메세지와 다음 메시지의 전송자가 같고, 이전 매시지와 전송자가 다르면 relayStart
              이전 메세지의 전송자와 현재 메시지의 전송자가 같고 relay
              현재 메세지와 다음 메시지의 전송자가 같고, 전송시간도 같으면 relayTime
            */
            const beforeMessage = data.chat.messages[index - 1];
            const nextMessage = data.chat.messages[index + 1];
            const isRelay = beforeMessage?.sender?.id === message.sender?.id;
            const isRelayStart =  beforeMessage?.sender?.id !== message.sender?.id && nextMessage?.sender?.id === message.sender?.id;
            const sameCreatedAtToNextMessage = nextMessage?.createdAt && isSameDate(new Date(nextMessage.createdAt), new Date(message.createdAt)) && nextMessage.sender?.id === message.sender?.id;
            return (
              <MessageItem
                key={message.id}
                senderId={message.sender?.id}
                body={message.body}
                createdAt={new Date(message.createdAt)}
                relay={isRelay}
                relayStart={isRelayStart}
                relayTime={sameCreatedAtToNextMessage}
              />
            )
          })}
        </MessagesBox>
        <Divider />
        <SendMessageBox>
          <TextArea value={body} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} />
          <SendButton onClick={handleClickSubmit} disabled={!body}>전송</SendButton>
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

const SendButton = styled.button<{ disabled: boolean }>`
  flex: 0 0 80px;
  height: 72px;
  border-radius: 8px;
  ${props => props.disabled ? `
    background-color: rgb(45, 45, 45);
    color: rgb(91, 91, 91);
    border: 1px solid rgb(64, 64, 64);
  ` : `
    background-color: rgb(251, 230, 77);
    color: #000000;
    border: none;
  `}
  
`