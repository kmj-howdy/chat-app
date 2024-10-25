import ChatScreen from '@/components/ChatScreen';
import ChatList from '@/components/ChatList';
import styled from 'styled-components';
import { Chat, ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';
import request from '@/utils/request';

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
  const [chatsData, setChatsData] = useState<Chat[]>();
  const [chatModels, setChatModels] = useState<ChatModels[]>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [selectedChatModelId, setSelectedChatModelId] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [fetchedChats, fetchedChatModels] = await Promise.all([
          request.get<Chat[]>('/chats'),
          request.get<ChatModels[]>('/chat_model'),
        ]);

        setChatsData(fetchedChats);
        setChatModels(fetchedChatModels);

        if (fetchedChatModels && fetchedChatModels.length > 0) {
          setSelectedChatModelId(fetchedChatModels[0].chat_model_id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateSelectedChat = (chat?: Chat) => {
    setSelectedChat(chat);

    setChatsData((prevChats) => {
      const existingChatIndex = prevChats?.findIndex((c) => c.chat_id === chat?.chat_id);
      if (existingChatIndex && existingChatIndex !== -1) {
        const updatedChats = [...(prevChats || [])];
        if (chat) {
          updatedChats[existingChatIndex] = chat;
        }
        return updatedChats;
      } else {
        if (chat) {
          if (prevChats?.find((prevChat) => prevChat.chat_id === chat.chat_id)) {
            return prevChats;
          }
          return [...(prevChats || []), chat];
        }
        return [...(prevChats || [])];
      }
    });
  };

  const handleNewChat = () => {
    setSelectedChat(undefined);
    setSelectedChatModelId(chatModels?.[0].chat_model_id ?? '');
  };

  const handleSelectModelChange = (modelId: string) => {
    setSelectedChatModelId(modelId);
    setSelectedChat(undefined);
  };

  return (
    <Container>
      <StyledChatList
        chatsData={chatsData}
        selectedChat={selectedChat}
        onSelectChat={updateSelectedChat}
        onClickNewButton={handleNewChat}
      />
      <StyledChatScreen
        selectedChat={selectedChat}
        onUpdateSelectedChat={updateSelectedChat}
        chatModel={selectedChatModelId}
        isLoading={isLoading}
        onModelChange={handleSelectModelChange}
        chatModels={chatModels}
      />
    </Container>
  );
};

export default Main;
