import { ChatModels } from '@/types/chat';
import request from '@/utils/request';

export const fetchChatModels = async () => {
  const result = await request.get<ChatModels[]>('/chat_model');
  return result;
};
