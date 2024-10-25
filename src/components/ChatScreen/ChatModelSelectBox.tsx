import useQuery from '@/hooks/useQuery';
import { ChatModels } from '@/types/chat';
import SelectBox, { SelectBoxProps, SelectOption } from '../common/SelectBox';

const convertChatModelsToOptions = (models: ChatModels[]): SelectOption[] => {
  return models.map((model) => ({
    value: model.chat_model_id,
    label: model.chat_model_name,
  }));
};

type ChatModelSelectBoxProps = {
  value?: string;
  onChange: SelectBoxProps['onChange'];
};

const ChatModelSelectBox = ({ value, onChange }: ChatModelSelectBoxProps) => {
  const { data: chatModels, isLoading } = useQuery<ChatModels[]>('/chat_model');

  if (isLoading) return <>...</>;
  if (!chatModels) return null;

  return (
    <SelectBox
      options={convertChatModelsToOptions(chatModels)}
      value={value}
      onChange={onChange}
      placeholder="모델을 선택해주세요"
    />
  );
};

export default ChatModelSelectBox;
