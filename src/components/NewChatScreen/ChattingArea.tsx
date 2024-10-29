import styled from 'styled-components';
import { useState, MouseEventHandler, useRef, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, ChatModelId, Dialogue } from '@/types/chat';
import { createChat, updateChatContent } from '@/apis/chatting';
import { AiMessage, UserMessage } from '../common/chatScreen/chat.style';
import { ERROR } from '@/constants/errorMessages';

const ChatContentWrapper = styled.div`
  flex: 1;
  position: relative;
  border: 1px solid grey;
  padding: 1rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
`;

export type ChattingAreaProps = {
  currentChatModelId: ChatModelId;
  onUpdateSelectedChat: (chat: Chat) => void;
};

const ChattingArea = ({ currentChatModelId, onUpdateSelectedChat }: ChattingAreaProps) => {
  const [value, setValue] = useState('');

  const [chatContent, setChatContent] = useState<Dialogue[]>();

  const isCreatingRef = useRef(false);

  const onSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (isCreatingRef.current) return;
    if (!value.trim()) return;

    try {
      isCreatingRef.current = true;

      const savedValue = value;
      setChatContent([
        {
          dialogue_id: uuidv4(),
          prompt: value,
          completion: '',
        },
      ]);
      setValue('');

      const createdChatData = await createChat({ chatModelId: currentChatModelId });
      const updatedChats = await updateChatContent({
        chatId: createdChatData.chat_id,
        value: savedValue,
      });
      onUpdateSelectedChat(updatedChats);
    } catch (err) {
      console.error(err);
      alert(ERROR.COMMON);
    } finally {
      isCreatingRef.current = false;
    }
  };

  return (
    <>
      <ChatContentWrapper>
        {chatContent?.map((dialogue) => {
          return (
            <Fragment key={dialogue.dialogue_id}>
              <UserMessage key={dialogue.dialogue_id}>{dialogue.prompt}</UserMessage>
              <AiMessage>입력중...</AiMessage>
            </Fragment>
          );
        })}
      </ChatContentWrapper>
      <InputWrapper>
        <StyledTextarea
          rows={3}
          disabled={!currentChatModelId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmit}
          disabled={!value || !currentChatModelId || isCreatingRef.current}
        >
          제출
        </button>
      </InputWrapper>
    </>
  );
};

export default ChattingArea;
