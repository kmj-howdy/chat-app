import { PropsWithClassName } from '@/types/style';
import styled from 'styled-components';
import SelectBox, { SelectOption } from '../common/SelectBox';
import { Chat, ChatModels, Dialogue } from '@/types/chat';
import { MouseEventHandler, useEffect, useState } from 'react';
import useQuery from '@/hooks/useQuery';
import { v4 as uuidv4 } from 'uuid';
import request from '@/utils/request';
import ChatContent from './ChatContent';

const Container = styled.div`
  padding: 2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
`;

const convertChatModelsToOptions = (models: ChatModels[]): SelectOption[] => {
  return models.map((model) => ({
    value: model.chat_model_id,
    label: model.chat_model_name,
  }));
};

type ChatScreenProps = {
  chatId: string;
  chatModel: Partial<ChatModels>;
};

const ChatScreen = ({ className, chatId, chatModel }: PropsWithClassName<ChatScreenProps>) => {
  const { data: initialChatContent } = useQuery<Chat>(`/chats/${chatId}`, {
    deps: [chatId],
  });
  const { data: chatModels } = useQuery<ChatModels[]>('/chat_model');

  const [chatContent, setChatContent] = useState<Chat | null>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initialChatContent) {
      setChatContent(initialChatContent);
    }
  }, [initialChatContent]);

  const handleSelectChange = (value: string) => {
    // TODO: 값 업데이트
    console.log('선택된 모델 id:', value);
  };

  const onSubmit: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    const userDialogueId = uuidv4();
    const userDialogue: Dialogue = {
      dialogue_id: userDialogueId,
      prompt: value,
      completion: '',
    };
    setChatContent((prevContent) =>
      prevContent ? { ...prevContent, dialogues: [...prevContent.dialogues, userDialogue] } : null,
    );

    updateChatContent({ userDialogueId: userDialogueId, value });

    setValue('');
  };

  const updateChatContent = async ({
    userDialogueId,
    value,
  }: {
    userDialogueId: string;
    value: string;
  }) => {
    try {
      const updatedChat = await request.post<Chat>(`/chats/${chatId}/dialogues`, {
        body: JSON.stringify({ prompt: value }),
      });

      setChatContent((prevContent) =>
        prevContent
          ? {
              ...prevContent,
              dialogues: prevContent.dialogues.map((dialogue) =>
                dialogue.dialogue_id === userDialogueId
                  ? { ...dialogue, completion: updatedChat.dialogues.slice(-1)[0].completion }
                  : dialogue,
              ),
            }
          : null,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className={className}>
      {chatModels && (
        <SelectBox
          placeholder="모델을 선택해주세요"
          options={convertChatModelsToOptions(chatModels)}
          onChange={handleSelectChange}
        />
      )}
      <ChatContent key={chatId} chatContent={chatContent} />
      <InputWrapper>
        <StyledTextarea
          rows={3}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button onClick={onSubmit} disabled={!value}>
          제출
        </button>
      </InputWrapper>
    </Container>
  );
};

export default ChatScreen;
