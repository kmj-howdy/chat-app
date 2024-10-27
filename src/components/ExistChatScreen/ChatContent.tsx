import { Chat } from '@/types/chat';
import throttle from '@/utils/throttle';
import { Fragment, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiMessage, UserMessage } from '../common/chatScreen/chat.style';

const ChatWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow-y: auto;
  border: 1px solid grey;
  padding: 1rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GoDownButton = styled.button<{ $showGoDownButton: boolean }>`
  position: sticky;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  visibility: ${(p) => (p.$showGoDownButton ? 'visible' : 'hidden')};
  opacity: ${(p) => (p.$showGoDownButton ? 1 : 0)};
  pointer-events: ${(p) => (p.$showGoDownButton ? 'auto' : 'none')};
`;

type ChatContentProps = {
  chatContent: Chat;
};

const ChatContent = ({ chatContent }: ChatContentProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [showGoDownButton, setShowGoDownButton] = useState(false);

  useEffect(() => {
    onScrollBottom('instant');
  }, [chatContent.dialogues.length]);

  const onScroll = throttle(() => {
    if (!ref.current) return;
    const { clientHeight, scrollHeight, scrollTop } = ref.current;

    const isAtBottom = clientHeight + scrollTop + 50 > scrollHeight;
    setShowGoDownButton(!isAtBottom);
  }, 200);

  const onScrollBottom = (scrollBehavior: ScrollBehavior = 'smooth') => {
    if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: scrollBehavior });
      setShowGoDownButton(false);
    }
  };

  return (
    <ChatWrapper ref={ref} onScroll={onScroll}>
      {chatContent?.dialogues.map((dialogue) => {
        return (
          <Fragment key={dialogue.dialogue_id}>
            <UserMessage>{dialogue.prompt}</UserMessage>
            <AiMessage>{dialogue.completion || '입력중...'}</AiMessage>
          </Fragment>
        );
      })}
      <GoDownButton onClick={() => onScrollBottom()} $showGoDownButton={showGoDownButton}>
        아래
      </GoDownButton>
    </ChatWrapper>
  );
};

export default ChatContent;
