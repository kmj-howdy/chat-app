import ChatList from '@/components/ChatList';
import styled from 'styled-components';
import { Chat } from '@/types/chat';
import { useEffect, useState } from 'react';
import { fetchChats } from '@/apis/chats';
import { Outlet } from 'react-router-dom';

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

const ChatScreenWrapper = styled.div`
  min-width: 70%;
  border: 1px solid blue;
`;

const Main = () => {
  const [chatsData, setChatsData] = useState<Chat[]>();

  useEffect(() => {
    const updateChatsData = async () => {
      try {
        const chatsData = await fetchChats();
        setChatsData(chatsData);
      } catch (error) {
        console.error(error);
      }
    };

    updateChatsData();
  }, []);

  const handleUpdateChatList = (chatList: Chat[]) => {
    setChatsData(chatList);
  };

  return (
    <Container>
      <StyledChatList chatsData={chatsData} />
      <ChatScreenWrapper>
        <Outlet context={{ onUpdateChatList: handleUpdateChatList }} />
      </ChatScreenWrapper>
    </Container>
  );
};

export default Main;
