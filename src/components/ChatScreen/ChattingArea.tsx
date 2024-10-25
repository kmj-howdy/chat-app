import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import { useState, MouseEventHandler, useEffect, useRef } from 'react';
import request from '@/utils/request';
import { Chat, Dialogue } from '@/types/chat';
import { updateChatContent } from '@/apis/chatting';

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
  const isCreatingRef = useRef(false);

  useEffect(() => {
    setChatContent(selectedChat || null);
  }, [selectedChat]);

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

      if (chatId) {
        // 기존 채팅
        setChatContent((prevContent) =>
          prevContent
            ? { ...prevContent, dialogues: [...prevContent.dialogues, userDialogue] }
            : null,
        );
        const updatedChats = await updateChatContent({ chatId, value: savedValue });
        if (updatedChats) {
          onUpdateSelectedChat(updatedChats);
        }
      } else {
        // 새로운 채팅 (채팅 및 대화 생성)
        const createdChatData = await createChat();
        if (createdChatData) {
          const updatedChat: Chat = {
            ...createdChatData,
            dialogues: [userDialogue],
          };
          onUpdateSelectedChat(updatedChat);
          const updatedChats = await updateChatContent({
            chatId: createdChatData.chat_id,
            value: savedValue,
          });
          if (updatedChats) {
            onUpdateSelectedChat(updatedChats);
          }
        }
      }
    } finally {
      isCreatingRef.current = false;
    }
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
