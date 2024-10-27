import styled from 'styled-components';
import { Chat, ChatModelId, ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';
import ChatModelSelectBox from '../common/chatScreen/ChatModelSelectBox';
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
import Skeleton from '../common/Skeleton';
import { convertChatModelsToOptions } from '../common/chatScreen/convertChatModelsToOptions';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;
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
  const currentChatModelId: ChatModelId = location.state?.currentChatModelId ?? _chat.chat_model_id;

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
  }, [location.state, onUpdateChatList]);

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
      state: { currentChatModelId: value },
    });
  };

  const updateSelectedChat = (chat: Chat) => {
    setChat(chat);
  };

  return (
    <Container>
      {isLoading ? (
        <Skeleton width="130px" />
      ) : (
        chatModels && (
          <ChatModelSelectBox
            options={convertChatModelsToOptions(chatModels)}
            value={currentChatModelId}
            onChange={handleSelectChange}
          />
        )
      )}

      <ChattingArea key={chatId} chatId={chatId} chat={chat} onUpdateChat={updateSelectedChat} />
    </Container>
  );
};

export default ExistChatScreen;
