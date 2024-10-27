import styled, { css } from 'styled-components';
import { useState, MouseEventHandler, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, Dialogue } from '@/types/chat';
import { createChat, updateChatContent } from '@/apis/chatting';

const ChatContentWrapper = styled.div`
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

const InputWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
`;

export type ChattingAreaProps = {
  selectedChatModelId: string;
  onUpdateSelectedChat: (chat: Chat) => void;
};

const ChattingArea = ({ selectedChatModelId, onUpdateSelectedChat }: ChattingAreaProps) => {
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

      const createdChatData = await createChat({ selectedChatModelId });
      if (createdChatData) {
        const updatedChats = await updateChatContent({
          chatId: createdChatData.chat_id,
          value: savedValue,
        });
        if (updatedChats) {
          onUpdateSelectedChat(updatedChats);
        }
      }
    } finally {
      isCreatingRef.current = false;
    }
  };

  return (
    <>
      <ChatContentWrapper>
        {chatContent?.map((dialogue) => {
          return <UserMessage key={dialogue.dialogue_id}>{dialogue.prompt}</UserMessage>;
        })}
      </ChatContentWrapper>
      <InputWrapper>
        <StyledTextarea
          rows={3}
          disabled={!selectedChatModelId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={onSubmit}
          disabled={!value || !selectedChatModelId || isCreatingRef.current}
        >
          제출
        </button>
      </InputWrapper>
    </>
  );
};

export default ChattingArea;
