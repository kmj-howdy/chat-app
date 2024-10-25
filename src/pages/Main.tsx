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

  const [selectedChat, setSelectedChat] = useState<Chat>();

  const handleSelectChat = (chat?: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <Container>
      <StyledChatList
        chatsData={chatsData}
        selectedChat={selectedChat}
        onSelectChat={handleSelectChat}
      />
      {/* TODO: 새로운 채팅화면 */}
      <StyledChatScreen
        chatId={selectedChat?.chat_id ?? '1'}
        chatModel={selectedChat?.chat_model_id ?? ''}
      />
    </Container>
  );
};

export default Main;
