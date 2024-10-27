import styled from 'styled-components';
import { Chat, ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';
import ChatModelSelectBox, { convertChatModelsToOptions } from '../ChatScreen/ChatModelSelectBox';
import ChattingArea from './ChattingArea';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { fetchChatModels } from '@/apis/chatModels';
import { fetchChats } from '@/apis/chats';

const Container = styled.div`
  padding: 2rem;
`;

const ExistChatScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { onUpdateChatList } = useOutletContext<{ onUpdateChatList: (chatList: Chat[]) => void }>();
  const { chatId } = useParams();

  const _chat = useLoaderData() as Chat;
  const [chat, setChat] = useState<Chat>(() => _chat);

  const [chatModels, setChatModels] = useState<ChatModels[]>();
  const [isLoading, setIsLoading] = useState(true);
  const selectedChatModelId = location.state?.selectedChatModelId ?? _chat.chat_model_id ?? '';

  useEffect(() => {
    const updateChatList = async () => {
      try {
        const fetchedChatList = await fetchChats();
        onUpdateChatList(fetchedChatList);
      } catch (error) {
        console.error(error);
      }
    };
    if (location.state?.isFromNewChat) {
      updateChatList();
    }
  }, [location.state]);

  useEffect(() => {
    const updateChatModels = async () => {
      try {
        setIsLoading(true);

        const fetchedChatModels = await fetchChatModels();
        setChatModels(fetchedChatModels);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    updateChatModels();
  }, []);

  useEffect(() => {
    setChat(_chat);
  }, [_chat]);

  if (!chatId) {
    return null;
  }

  const handleSelectChange = (value: string) => {
    navigate(`/chats`, {
      state: { selectedChatModelId: value },
    });
  };

  const updateSelectedChat = (chat: Chat) => {
    setChat(chat);
  };

  return (
    <Container>
      {isLoading ? (
        <p>모델 목록 불러오는 중...</p>
      ) : (
        chatModels && (
          <ChatModelSelectBox
            options={convertChatModelsToOptions(chatModels)}
            value={selectedChatModelId}
            onChange={handleSelectChange}
          />
        )
      )}

      <ChattingArea key={chatId} chatId={chatId} chat={chat} onUpdateChat={updateSelectedChat} />
    </Container>
  );
};

export default ExistChatScreen;
