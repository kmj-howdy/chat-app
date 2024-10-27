import { ChatModels } from '@/types/chat';
import { SelectOption } from '../SelectBox';

export const convertChatModelsToOptions = (models: ChatModels[]): SelectOption[] => {
  return models.map((model) => ({
    value: model.chat_model_id,
    label: model.chat_model_name,
  }));
};
