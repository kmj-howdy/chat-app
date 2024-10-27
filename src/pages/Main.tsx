import ChatList from '@/components/ChatList';
import styled from 'styled-components';
import { Chat } from '@/types/chat';
import { useCallback, useEffect, useState } from 'react';
import { fetchChats } from '@/apis/chats';
import { Outlet, useLocation } from 'react-router-dom';

const Container = styled.main`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
`;

const StyledChatList = styled(ChatList)`
  flex: 1 0 30%;
  border-right: 1px solid black;
`;

const ChatScreenWrapper = styled.div`
  flex: 1 0 70%;
`;

const Main = () => {
  const location = useLocation();
  const selectedChatModelId = location.state?.selectedChatModelId ?? '';

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

  const handleUpdateChatList = useCallback((chatList: Chat[]) => {
    setChatsData(chatList);
  }, []);

  return (
    <Container>
      <StyledChatList chatsData={chatsData} />
      <ChatScreenWrapper>
        <Outlet context={{ selectedChatModelId, onUpdateChatList: handleUpdateChatList }} />
      </ChatScreenWrapper>
    </Container>
  );
};

export default Main;
