import SelectBox, { SelectBoxProps } from '../SelectBox';
import styled from 'styled-components';

const StyledSelectBox = styled(SelectBox)`
  width: max-content;
  margin-bottom: 0.5rem;
`;

type ChatModelSelectBoxProps = {
  value?: string;
  onChange: SelectBoxProps['onChange'];
  options: SelectBoxProps['options'];
};

const ChatModelSelectBox = ({ options, value, onChange }: ChatModelSelectBoxProps) => {
  return (
    <StyledSelectBox
      options={options}
      value={value}
      onChange={onChange}
      placeholder="모델을 선택해주세요"
    />
  );
};

export default ChatModelSelectBox;
