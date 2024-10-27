import { Chat, ChatModels } from '@/types/chat';
import request from '@/utils/request';

interface FetchChatsAndModelsFunc {
  (): Promise<{ chatsData: Chat[]; chatModels: ChatModels[] } | undefined>;
}

export const fetchChatsAndModels: FetchChatsAndModelsFunc = async () => {
  try {
    const [fetchedChats, fetchedChatModels] = await Promise.all([
      request.get<Chat[]>('/chats'),
      request.get<ChatModels[]>('/chat_model'),
    ]);

    return {
      chatsData: fetchedChats,
      chatModels: fetchedChatModels,
    };
  } catch (error) {
    console.error(error);
  }
};

export const fetchChats = async () => {
  const result = await request.get<Chat[]>('/chats');
  return result;
};
