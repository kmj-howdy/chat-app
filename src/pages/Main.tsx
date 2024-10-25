import ChatScreen from '@/components/ChatScreen';
import ChatList from '@/components/ChatList';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { Chat } from '@/types/chat';
import { useState } from 'react';

const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  border: 1px solid green;
`;

const StyledChatList = styled(ChatList)`
  min-width: 30%;
  border: 1px solid red;
`;

const StyledChatScreen = styled(ChatScreen)`
  min-width: 70%;
  border: 1px solid blue;
`;

const Main = () => {
  // TODO: initial 데이터 수정 필요

  const { data: chatsData } = useQuery<Chat[]>('/chats');

  const [selectedChatId, setSelectedChatId] = useState<string>();

  const handleSelectChat = (chatId?: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <Container>
      <StyledChatList
        chatsData={chatsData}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
      />
      {/* TODO: 새로운 채팅화면 */}
      <StyledChatScreen chatId={selectedChatId ?? '1'} />
    </Container>
  );
};

export default Main;
