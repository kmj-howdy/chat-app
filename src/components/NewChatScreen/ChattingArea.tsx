import styled from 'styled-components';
import { useState, MouseEventHandler, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Chat, Dialogue } from '@/types/chat';
import { createChat, updateChatContent } from '@/apis/chatting';
import { UserMessage } from '../common/chatScreen/chat.style';

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
