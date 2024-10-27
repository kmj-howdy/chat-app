import styled from 'styled-components';
import { ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { fetchChatModels } from '@/apis/chatModels';
import ChattingArea from './ChattingArea';
import ChatModelSelectBox, {
  convertChatModelsToOptions,
} from '../common/chatScreen/ChatModelSelectBox';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
`;

const NewChatScreen = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [selectedChatModelId, setSelectedChatModelId] = useState<string>(
    location.state?.selectedChatModelId ?? '',
  );

  const [chatModels, setChatModels] = useState<ChatModels[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateChatModels = async () => {
      try {
        setIsLoading(true);

        const fetchedChatModels = await fetchChatModels();
        setChatModels(fetchedChatModels);
        if (fetchedChatModels && fetchedChatModels.length > 0)
          setSelectedChatModelId(fetchedChatModels[0].chat_model_id);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    updateChatModels();
  }, []);

  const handleSelectChange = (value: string) => {
    setSelectedChatModelId(value);
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

      <ChattingArea
        selectedChatModelId={selectedChatModelId}
        onUpdateSelectedChat={async (newChat) => {
          navigate(`/chats/${newChat.chat_id}`, {
            state: { isFromNewChat: true, selectedChatModelId },
          });
        }}
      />
    </Container>
  );
};

export default NewChatScreen;
