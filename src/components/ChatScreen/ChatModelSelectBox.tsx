import { ChatModels } from '@/types/chat';
import SelectBox, { SelectBoxProps, SelectOption } from '../common/SelectBox';

export const convertChatModelsToOptions = (models: ChatModels[]): SelectOption[] => {
  return models.map((model) => ({
    value: model.chat_model_id,
    label: model.chat_model_name,
  }));
};

type ChatModelSelectBoxProps = {
  value?: string;
  onChange: SelectBoxProps['onChange'];
  options: SelectBoxProps['options'];
};

const ChatModelSelectBox = ({ options, value, onChange }: ChatModelSelectBoxProps) => {
  return (
    <SelectBox
      options={options}
      value={value}
      onChange={onChange}
      placeholder="모델을 선택해주세요"
    />
  );
};

export default ChatModelSelectBox;
