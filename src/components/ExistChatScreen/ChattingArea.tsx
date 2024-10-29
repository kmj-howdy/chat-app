import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import { useState, MouseEventHandler, useRef } from 'react';
import { Chat, Dialogue } from '@/types/chat';
import { updateChatContent } from '@/apis/chatting';
import { ERROR } from '@/constants/errorMessages';

const InputWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
`;

export type ChattingAreaProps = {
  chatId: string;
  chat: Chat;
  onUpdateChat: (chat: Chat) => void;
};

const ChattingArea = ({ chatId, chat, onUpdateChat }: ChattingAreaProps) => {
  const [value, setValue] = useState('');

  const isCreatingRef = useRef(false);

  const onSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (isCreatingRef.current) return;
    if (!value.trim()) return;

    try {
      isCreatingRef.current = true;

      const savedValue = value;
      setValue('');

      const userDialogue: Dialogue = {
        dialogue_id: uuidv4(),
        prompt: savedValue,
        completion: '',
      };

      onUpdateChat({
        ...chat,
        dialogues: [...chat.dialogues, userDialogue],
      });

      const updatedChats = await updateChatContent({ chatId, value: savedValue });
      onUpdateChat(updatedChats);
    } catch (err) {
      console.error(err);
      alert(ERROR.COMMON);
    } finally {
      isCreatingRef.current = false;
    }
  };

  return (
    <>
      <ChatContent chatContent={chat} />
      <InputWrapper>
        <StyledTextarea rows={3} value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={onSubmit} disabled={!value || isCreatingRef.current}>
          제출
        </button>
      </InputWrapper>
    </>
  );
};

export default ChattingArea;
