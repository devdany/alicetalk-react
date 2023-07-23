import React from 'react';
import styled from 'styled-components';

const ChatProfile: React.FC = () => {
  return (
    <ChatProfileImage  />
  )
}

export default ChatProfile;

const ChatProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 15px;
  background-color: lightgray;
`