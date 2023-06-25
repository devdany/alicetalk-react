import React from 'react';
import styled from 'styled-components'
import ChatProfile from '../../components/ChatProfile';
import { useMeQuery } from '../../generated/graphql';
import { useLoggedIn } from '../../hooks/loggedIn';
import { dateFormatter } from '../../utils/dateFormatter';

type MessageItemProps = {
  body: string;
  createdAt: Date;
  relayStart?: boolean;
  relay: boolean;
  senderId?: string;
  relayTime: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ body, createdAt, relay, senderId, relayStart, relayTime }) => {
  const loggedIn = useLoggedIn();
  const { data } = useMeQuery({
    skip: !loggedIn
  });

  if (!data?.me) {
    return null;
  }
  if (!relay && senderId !== data.me.id) {
    return (
      <OtherUserMessageItemBox>
        <ChatProfile />
        <OtherUserMessageItemContentBox>
          <SenderName>heidi</SenderName>
          <OtherUserMessageContentBox>
            <OtherUserMessageBox>
              {body}
            </OtherUserMessageBox>
            {!relayTime && (
              <CreatedAtBox>
                {dateFormatter(createdAt)}
              </CreatedAtBox>
            )}
            
          </OtherUserMessageContentBox>
          
        </OtherUserMessageItemContentBox>
      </OtherUserMessageItemBox>
    )
  }  else if (relay && senderId !== data.me.id) {
    return (
      <OtherUserMessageItemBox>
        <OtherUserMessageItemContentBox style={{ marginLeft: 62 }}>
          <OtherUserMessageContentBox>
            <OtherUserMessageBox>
              {body}
            </OtherUserMessageBox>
            {!relayTime && (
              <CreatedAtBox>
              {dateFormatter(createdAt)}
            </CreatedAtBox>
            )}
            
            
          </OtherUserMessageContentBox>
          
        </OtherUserMessageItemContentBox>
      </OtherUserMessageItemBox>
    )
  } else if (senderId === data.me.id) {
    return (
      <MyMessageItemBox>
        <MyMessageContentBox>
          {!relayTime && (
            <CreatedAtBox>{dateFormatter(createdAt)}</CreatedAtBox>
          )}
          
          <MyMessageBox>{body}</MyMessageBox>
        </MyMessageContentBox>
      </MyMessageItemBox>
    )
  }
  return null
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


