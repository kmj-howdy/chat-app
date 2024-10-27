import { Chat } from '@/types/chat';
import request from '@/utils/request';

export const chatLoader = async (chatId?: string) => {
  const result = await request.get<Chat[]>(`/chats/${chatId}`);
  return result;
};
