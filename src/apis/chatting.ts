import { Chat } from '@/types/chat';
import request from '@/utils/request';

export const createChat = async ({ chatModelId }: { chatModelId: string }) => {
  const createdChat = await request.post<Chat[]>('/chats', {
    body: JSON.stringify({
      chat_model_id: chatModelId,
    }),
  });
  return createdChat[createdChat.length - 1];
};

export const updateChatContent = async ({ chatId, value }: { chatId: string; value: string }) => {
  const updatedChats = await request.post<Chat>(`/chats/${chatId}/dialogues`, {
    body: JSON.stringify({ prompt: value }),
  });
  return updatedChats;
};
