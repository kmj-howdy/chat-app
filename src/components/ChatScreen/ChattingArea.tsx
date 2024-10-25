import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import { useState, MouseEventHandler, useEffect } from 'react';
import request from '@/utils/request';
import { Chat, Dialogue } from '@/types/chat';

const InputWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
`;

export type ChattingAreaProps = {
  selectedChat?: Chat;
  onUpdateSelectedChat: (chat: Chat) => void;
  chatId?: string;
  selectedChatModelId: string;
};

const ChattingArea = ({
  chatId,
  selectedChatModelId,
  selectedChat,
  onUpdateSelectedChat,
}: ChattingAreaProps) => {
  const [value, setValue] = useState('');

  const [chatContent, setChatContent] = useState<Chat | null>(selectedChat || null);

  useEffect(() => {
    setChatContent(selectedChat || null);
  }, [selectedChat]);

  const onSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    const userDialogue: Dialogue = {
      dialogue_id: uuidv4(),
      prompt: value,
      completion: '',
    };

    if (chatId) {
      // 기존 채팅
      setChatContent((prevContent) =>
        prevContent
          ? { ...prevContent, dialogues: [...prevContent.dialogues, userDialogue] }
          : null,
      );
      updateChatContent({ chatId, value });
    } else {
      // 새로운 채팅 (채팅 및 대화 생성)
      const createdChatData = await createChat();
      if (createdChatData) {
        const updatedChat: Chat = {
          ...createdChatData,
          dialogues: [userDialogue],
        };
        onUpdateSelectedChat(updatedChat);

        await updateChatContent({
          chatId: createdChatData.chat_id,
          value,
        });
      }
    }

    setValue('');
  };

  const createChat = async () => {
    try {
      const createdChat = await request.post<Chat[]>('/chats', {
        body: JSON.stringify({
          chat_model_id: selectedChatModelId,
        }),
      });
      return createdChat[createdChat.length - 1];
    } catch (error) {
      console.error(error);
    }
  };

  const updateChatContent = async ({ chatId, value }: { chatId: string; value: string }) => {
    try {
      const updatedChats = await request.post<Chat>(`/chats/${chatId}/dialogues`, {
        body: JSON.stringify({ prompt: value }),
      });
      onUpdateSelectedChat(updatedChats);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ChatContent chatContent={chatContent} />
      <InputWrapper>
        <StyledTextarea
          rows={3}
          disabled={!selectedChatModelId}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={onSubmit} disabled={!value || !selectedChatModelId}>
          제출
        </button>
      </InputWrapper>
    </>
  );
};

export default ChattingArea;
