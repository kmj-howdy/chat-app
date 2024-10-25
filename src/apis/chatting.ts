import { Chat } from '@/types/chat';
import request from '@/utils/request';

interface CreateChatFunc {
  (params: { selectedChatModelId: string }): Promise<Chat | undefined>;
}
export const createChat: CreateChatFunc = async ({ selectedChatModelId }) => {
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

interface UpdateChatContentFunc {
  (params: { chatId: string; value: string }): Promise<Chat | undefined>;
}
export const updateChatContent: UpdateChatContentFunc = async ({ chatId, value }) => {
  try {
    const updatedChats = await request.post<Chat>(`/chats/${chatId}/dialogues`, {
      body: JSON.stringify({ prompt: value }),
    });
    return updatedChats;
  } catch (error) {
    console.error(error);
  }
};
