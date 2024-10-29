import styled from 'styled-components';
import { ChatModelId, ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { fetchChatModels } from '@/apis/chatModels';
import ChattingArea from './ChattingArea';
import ChatModelSelectBox from '../common/chatScreen/ChatModelSelectBox';
import Skeleton from '../common/Skeleton';
import { convertChatModelsToOptions } from '../common/chatScreen/convertChatModelsToOptions';
import { ERROR } from '@/constants/errorMessages';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
`;

const NewChatScreen = () => {
  const navigate = useNavigate();
  const { currentChatModelId: _currentChatModelId } = useOutletContext<{
    currentChatModelId: ChatModelId;
  }>();

  const [currentChatModelId, setCurrentChatModelId] = useState<ChatModelId>(_currentChatModelId);

  const [chatModels, setChatModels] = useState<ChatModels[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateChatModels = async () => {
      try {
        setIsLoading(true);

        const fetchedChatModels = await fetchChatModels();
        setChatModels(fetchedChatModels);
        if (!currentChatModelId && fetchedChatModels.length > 0)
          setCurrentChatModelId(fetchedChatModels[0].chat_model_id);
      } catch (err) {
        console.error(err);
        alert(ERROR.COMMON);
      } finally {
        setIsLoading(false);
      }
    };
    updateChatModels();
  }, [currentChatModelId]);

  const handleSelectChange = (value: string) => {
    setCurrentChatModelId(value as ChatModelId);
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

      <ChattingArea
        currentChatModelId={currentChatModelId}
        onUpdateSelectedChat={async (newChat) => {
          navigate(`/chats/${newChat.chat_id}`, {
            state: { isFromNewChat: true, currentChatModelId },
          });
        }}
      />
    </Container>
  );
};

export default NewChatScreen;
