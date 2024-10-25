export type ChatModelId = 'test-model-001' | 'test-model-002' | 'test-model-003';
export type ChatModelName = 'Nota_Model_01' | 'Nota_Model_02' | 'Nota_Model_03';

export type Dialogue = {
  /** 채팅 쌍의 id */
  dialogue_id: string;
  /** 질문 */
  prompt: string;
  /** 답변 */
  completion: string;
};

export type ChatModels = {
  chat_model_id: ChatModelId;
  chat_model_name: ChatModelName;
};

export type Chat = ChatModels & {
  chat_id: string;
  dialogues: Dialogue[];
};
