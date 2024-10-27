import { Chat } from '@/types/chat';
import request from '@/utils/request';

export const fetchChats = async () => {
  const result = await request.get<Chat[]>('/chats');
  return result;
};
