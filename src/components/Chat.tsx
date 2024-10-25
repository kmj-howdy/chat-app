import { ClassName } from '@/types/style';

import styled, { css } from 'styled-components';
import SelectBox, { SelectOption } from './common/SelectBox';
import { ChatModels } from '@/types/chat';
import { CHAT_MODELS, CHATS } from '@/mock/data';
import { MouseEventHandler } from 'react';

const Container = styled.div`
  padding: 2rem;
`;

const ChatWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  border: 1px solid grey;
  height: 90%;
  padding: 1rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const chatMessageStyle = css`
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  border-radius: 1.125rem 1.125rem 1.125rem 0;
  min-height: 2.25rem;
  width: fit-content;
  max-width: 66%;
`;

const UserMessage = styled.div`
  ${chatMessageStyle};
  margin: 1rem 0 0 auto;
  border-radius: 1.125rem 1.125rem 0 1.125rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const AiMessage = styled.div`
  ${chatMessageStyle};
  margin: 1rem auto 0 0;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const GoDownButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 2rem;
  transform: translateX(-50%);
`;

const InputWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const StyledTextarea = styled.textarea`
  flex-grow: 1;
`;

const convertChatModelsToOptions = (models: ChatModels[]): SelectOption[] => {
  return models.map((model) => ({
    value: model.chat_model_id,
    label: model.chat_model_name,
  }));
};

const Chat = ({ className }: ClassName) => {
  // TODO: 모델 불러오기
  const chatModels = CHAT_MODELS;
  // TODO: 대화내역 불러오기
  const chatContent = CHATS[0];

  const handleSelectChange = (value: string) => {
    // TODO: 값 업데이트
    console.log('선택된 모델 id:', value);
  };

  const onScrollBottom = () => {
    // TODO: 최하단으로 스크롤 구현
  };

  const onSubmit: MouseEventHandler = (e) => {
    e.preventDefault();
    // TODO: api 연동
  };

  return (
    <Container className={className}>
      <SelectBox
        placeholder="모델을 선택해주세요"
        options={convertChatModelsToOptions(chatModels)}
        onChange={handleSelectChange}
      />
      <ChatWrapper>
        {chatContent.dialogues.map((dialogue) => {
          // TODO: 대화 주체 분기처리
          return <UserMessage>{dialogue.completion}</UserMessage>;
        })}
        <GoDownButton onClick={onScrollBottom}>아래</GoDownButton>
      </ChatWrapper>
      <InputWrapper>
        <StyledTextarea rows={3} />
        <button onClick={onSubmit}>제출</button>
      </InputWrapper>
    </Container>
  );
};

export default Chat;
