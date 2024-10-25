import { PropsWithClassName } from '@/types/style';
import styled from 'styled-components';
import { ChatModels } from '@/types/chat';
import { useEffect, useState } from 'react';
import ChatModelSelectBox, { convertChatModelsToOptions } from './ChatModelSelectBox';
import ChattingArea, { ChattingAreaProps } from './ChattingArea';

const Container = styled.div`
  padding: 2rem;
`;

type ChatScreenProps = {
  selectedChat?: ChattingAreaProps['selectedChat'];
  onUpdateSelectedChat: ChattingAreaProps['onUpdateSelectedChat'];
  chatModel: string;
  onModelChange: (modelId: string) => void;
  isLoading: boolean;
  chatModels?: ChatModels[];
};

const ChatScreen = ({
  className,
  chatModel,
  selectedChat,
  onUpdateSelectedChat,
  isLoading,
  chatModels,
  onModelChange,
}: PropsWithClassName<ChatScreenProps>) => {
  const chatId = selectedChat?.chat_id;

  const [selectedChatModelId, setSelectedChatModelId] = useState(chatModel);

  useEffect(() => {
    if (chatModel) {
      setSelectedChatModelId(chatModel);
    }
  }, [chatModel]);

  const handleSelectChange = (value: string) => {
    setSelectedChatModelId(value);
    onModelChange(value);
  };

  return (
    <Container className={className}>
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
        chatId={chatId}
        selectedChatModelId={selectedChatModelId}
        selectedChat={selectedChat}
        onUpdateSelectedChat={onUpdateSelectedChat}
      />
    </Container>
  );
};

export default ChatScreen;
