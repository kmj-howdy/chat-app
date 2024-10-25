import { PropsWithClassName } from '@/types/style';
import styled, { css } from 'styled-components';
import SelectBox, { SelectOption } from '../common/SelectBox';
import { Chat, ChatModels, Dialogue } from '@/types/chat';
import { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import useQuery from '@/hooks/useQuery';
import { v4 as uuidv4 } from 'uuid';
import request from '@/utils/request';

const Container = styled.div`
  padding: 2rem;
`;

const ChatWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  border: 1px solid grey;
  height: 90%;
  padding: 1rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const chatMessageStyle = css`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: fit-content;
  max-width: 66%;
`;

const UserMessage = styled.div`
  ${chatMessageStyle};
  margin: 1rem 0 0 auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: ${(p) => p.theme.colors.secondary};
`;

const AiMessage = styled.div`
  ${chatMessageStyle};
  margin: 1rem auto 0 0;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const GoDownButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
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
};

const ChatScreen = ({ className, chatId }: PropsWithClassName<ChatScreenProps>) => {
  const { data: initialChatContent } = useQuery<Chat>(`/chats/${chatId}`, {
    deps: [chatId],
  });
  const { data: chatModels } = useQuery<ChatModels[]>('/chat_model');

  const [localChatContent, setLocalChatContent] = useState<Chat | null>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (initialChatContent) {
      setLocalChatContent(initialChatContent);
    }
  }, [initialChatContent]);

  const handleSelectChange = (value: string) => {
    // TODO: 값 업데이트
    console.log('선택된 모델 id:', value);
  };

  const onScrollBottom = () => {
    // TODO: 최하단으로 스크롤 구현
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
    setLocalChatContent((prevContent) =>
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

      setLocalChatContent((prevContent) =>
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
      <ChatWrapper>
        {localChatContent?.dialogues.map((dialogue) => {
          return (
            <Fragment key={dialogue.dialogue_id}>
              <UserMessage>{dialogue.prompt}</UserMessage>
              <AiMessage>{dialogue.completion || '입력중...'}</AiMessage>
            </Fragment>
          );
        })}
        <GoDownButton onClick={onScrollBottom}>아래</GoDownButton>
      </ChatWrapper>
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
