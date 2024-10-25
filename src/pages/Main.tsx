import ChatScreen from '@/components/ChatScreen';
import ChatList from '@/components/ChatList';
import styled from 'styled-components';
import useQuery from '@/hooks/useQuery';
import { Chat, ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';

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
  const { data: initialChatsData } = useQuery<Chat[]>('/chats');
  const { data: chatModels, isLoading: isChatModelsLoading } =
    useQuery<ChatModels[]>('/chat_model');

  const [chatsData, setChatsData] = useState<Chat[]>();
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [selectedChatModelId, setSelectedChatModelId] = useState<string>('');

  useEffect(() => {
    if (initialChatsData) {
      setChatsData(initialChatsData);
    }
  }, [initialChatsData]);

  useEffect(() => {
    if (chatModels && chatModels.length > 0) {
      setSelectedChatModelId(chatModels[0].chat_model_id);
    }
  }, [chatModels]);

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
      />
      <StyledChatScreen
        selectedChat={selectedChat}
        onUpdateSelectedChat={updateSelectedChat}
        chatModel={selectedChatModelId}
        isLoading={isChatModelsLoading}
        onModelChange={handleSelectModelChange}
        chatModels={chatModels}
      />
    </Container>
  );
};

export default Main;
