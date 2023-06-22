import React from 'react';
import styled from 'styled-components';

const ChatProfile: React.FC = () => {
  return (
    <ChatProfileImage src="https://cdn-api.elice.io/api/file/5064c6bd5ffc458c86a6befe8fc5136b/%E1%84%8C%E1%85%A1%E1%84%89%E1%85%A1%E1%86%AB%201.png?se=2023-07-06T00%3A15%3A00Z&sp=r&sv=2021-12-02&sr=b&sig=tMJFQl%2BIdvn9r4cILzgtxrfQOyqHK1UZb9g6rtQb/Ac%3D" />
  )
}

export default ChatProfile;

const ChatProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 15px;
`