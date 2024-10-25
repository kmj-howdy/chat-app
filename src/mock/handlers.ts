/* eslint-disable @typescript-eslint/no-explicit-any */

import { delay, http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { CHAT_MODELS, CHATS } from './data';

let chatData = CHATS;
const chatModels = CHAT_MODELS;

export const handlers = [
  // 사용 예시를 위한 api 입니다.
  http.get('/test', async () => {
    return HttpResponse.json({
      test: 'test',
    });
  }),

  // 채팅 목록
  http.get('/chats', async () => {
    return HttpResponse.json({
      data: chatData,
    });
  }),

  // 채팅 생성
  http.post<any, { chat_model_id: string }, any>('/chats', async ({ request }) => {
    const { chat_model_id } = await request.json();

    chatData.push({
      chat_model_id: chat_model_id,
      chat_model_name:
        chatModels.find(({ chat_model_id: modelId }) => chat_model_id === modelId)
          ?.chat_model_name || '',
      chat_id: uuidv4(),
      dialogues: [],
    });

    return HttpResponse.json({
      data: chatData,
    });
  }),

  // 단일 채팅 조회
  http.get<{ chatId: string }, any, any, '/chats/:chatId'>('/chats/:chatId', async ({ params }) => {
    const { chatId } = params;
    const data = chatData.find((chat) => chat.chat_id === chatId);

    return HttpResponse.json({
      data,
    });
  }),

  // 단일 채팅에 대화 추가
  http.post<{ chatId: string }, { prompt: string }, any, '/chats/:chatId/dialogues'>(
    '/chats/:chatId/dialogues',
    async ({ params, request }) => {
      await delay(2000);
      const { chatId } = params;
      const { prompt } = await request.json();

      const data: any = chatData.find((chat) => chat.chat_id === chatId) || [];
      const response = {
        ...data,
        dialogues: data.dialogues.concat({
          dialogue_id: uuidv4(),
          prompt,
          completion: 'Mock 응답',
        }),
      };

      chatData = chatData.map((item) => {
        if (item.chat_id === chatId) {
          return response;
        }

        return item;
      });

      return HttpResponse.json({
        data: response,
      });
    },
  ),

  // 모델 목록
  http.get('/chat_model', async () => {
    return HttpResponse.json({
      data: chatModels,
    });
  }),
];
