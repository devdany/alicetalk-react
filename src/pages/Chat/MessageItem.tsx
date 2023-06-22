import React from 'react';
import styled from 'styled-components'
import ChatProfile from '../../components/ChatProfile';

type MessageItemProps = {
  body: string;
  createdAt: Date;
  relayStart?: boolean;
  relay: boolean;
  relayLast?: boolean;
  senderId: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ body, createdAt, relay, senderId, relayLast, relayStart }) => {
  if (!relay && senderId !== 'me') {
    return (
      <OtherUserMessageItemBox>
        <ChatProfile />
        <OtherUserMessageItemContentBox>
          <SenderName>heidi</SenderName>
          <OtherUserMessageContentBox>
            <OtherUserMessageBox>
              {body}
            </OtherUserMessageBox>
            {!relayStart && (
              <CreatedAtBox>
                오후 7:30
              </CreatedAtBox>
            )}
            
          </OtherUserMessageContentBox>
          
        </OtherUserMessageItemContentBox>
      </OtherUserMessageItemBox>
    )
  }  else if (relay && senderId !== 'me') {
    return (
      <OtherUserMessageItemBox>
        <OtherUserMessageItemContentBox style={{ marginLeft: 62 }}>
          <OtherUserMessageContentBox>
            <OtherUserMessageBox>
              {body}
            </OtherUserMessageBox>
            {relayLast && (
              <CreatedAtBox>
                오후 7:30
              </CreatedAtBox>
            )}
            
          </OtherUserMessageContentBox>
          
        </OtherUserMessageItemContentBox>
      </OtherUserMessageItemBox>
    )
  } else if (senderId === 'me') {
    return (
      <MyMessageItemBox>
        <MyMessageContentBox>
          {!relay && (
            <CreatedAtBox>오후 7:33</CreatedAtBox>
          )}
          
          <MyMessageBox>{body}</MyMessageBox>
        </MyMessageContentBox>
      </MyMessageItemBox>
    )
  }
  return (
    <MessageItemBox>
      MessageItem
    </MessageItemBox>
  )
}

export default MessageItem;

const OtherUserMessageItemBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 0 12px;
`;

const OtherUserMessageItemContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 12px;
`;

const SenderName = styled.span`
  color: rgb(155, 155, 155);
`

const OtherUserMessageContentBox = styled.div`
  display: flex;
  gap: 6px;
`

const OtherUserMessageBox = styled.div`
  background-color: rgb(56, 56, 56);
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #ffffff;
  font-size: 14px;
  border-radius: 4px;
`

const CreatedAtBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: rgb(155, 155, 155);
  font-size: 12px;
`

const MessageItemBox = styled.div`
  width: 100%;
`;

const MyMessageItemBox = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 32px;
  padding-right: 12px;
`;

const MyMessageContentBox = styled.div`
  display: flex;
  gap: 6px;
`;

const MyMessageBox = styled.div`
  background-color: rgb(251, 229, 77);
  height: 32px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #000000;
  font-size: 14px;
  border-radius: 4px;
`;


