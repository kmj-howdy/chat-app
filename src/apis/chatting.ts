import { Chat } from '@/types/chat';
import request from '@/utils/request';

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
