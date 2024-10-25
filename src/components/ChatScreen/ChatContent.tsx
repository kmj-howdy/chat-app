import { Chat } from '@/types/chat';
import { Fragment } from 'react';
import styled, { css } from 'styled-components';

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
  background-color: ${(p) => p.theme.colors.secondary};
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

type ChatContentProps = {
  chatContent: Chat | null;
};

const ChatContent = ({ chatContent }: ChatContentProps) => {
  const onScrollBottom = () => {
    // TODO: 최하단으로 스크롤 구현
  };

  return (
    <ChatWrapper>
      {chatContent?.dialogues.map((dialogue) => {
        return (
          <Fragment key={dialogue.dialogue_id}>
            <UserMessage>{dialogue.prompt}</UserMessage>
            <AiMessage>{dialogue.completion || '입력중...'}</AiMessage>
          </Fragment>
        );
      })}
      <GoDownButton onClick={onScrollBottom}>아래</GoDownButton>
    </ChatWrapper>
  );
};

export default ChatContent;
