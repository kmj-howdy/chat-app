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
    if (selectedChat) {
      setChatContent(selectedChat);
    }
  }, [selectedChat]);

  const onSubmit: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (!value.trim()) return;

    if (chatId) {
      // 기존 채팅
      const userDialogueId = uuidv4();
      const userDialogue: Dialogue = {
        dialogue_id: userDialogueId,
        prompt: value,
        completion: '',
      };

      setChatContent((prevContent) =>
        prevContent
          ? { ...prevContent, dialogues: [...prevContent.dialogues, userDialogue] }
          : null,
      );

      updateChatContent({ chatId, userDialogueId, value });
    } else {
      // 새로운 채팅 (채팅 및 대화 생성)
      const createdChatData = await createChat();
      if (createdChatData) {
        const userDialogueId = uuidv4();
        const newDialogue: Dialogue = {
          dialogue_id: userDialogueId,
          prompt: value,
          completion: '',
        };
        const updatedChat: Chat = {
          ...createdChatData,
          dialogues: [newDialogue],
        };
        onUpdateSelectedChat(updatedChat);

        await updateChatContent({
          chatId: createdChatData.chat_id,
          userDialogueId,
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

  const updateChatContent = async ({
    chatId,
    userDialogueId,
    value,
  }: {
    chatId: string;
    userDialogueId: string;
    value: string;
  }) => {
    try {
      const updatedChats = await request.post<Chat>(`/chats/${chatId}/dialogues`, {
        body: JSON.stringify({ prompt: value }),
      });

      setChatContent((prevContent) =>
        prevContent
          ? {
              ...prevContent,
              dialogues: prevContent.dialogues.map((dialogue) =>
                dialogue.dialogue_id === userDialogueId
                  ? { ...dialogue, completion: updatedChats.dialogues.slice(-1)[0].completion }
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
