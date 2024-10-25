import styled from 'styled-components';
import { PropsWithClassName } from '@/types/style';
import { Chat } from '@/types/chat';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const CrateChatButton = styled.button`
  width: 100px;
`;

const ChatListWrapper = styled.div`
  padding: 1rem;
  overflow-y: auto;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ChatItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;

  padding: 0.5rem;
  border: 1px solid blue;
  background-color: ${(p) => p.$isSelected && p.theme.colors.main};
  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.colors.secondary};
  }
`;

const ChatFirstQuestion = styled.p`
  margin-bottom: 0.5rem;
`;

const ChatModelName = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: gray;
`;

type ChatListProps = {
  chatsData?: Chat[];
  selectedChatId?: string;
  onSelectChat: (chatId?: string) => void;
};

const ChatList = ({
  chatsData,
  selectedChatId,
  onSelectChat,
  className,
}: PropsWithClassName<ChatListProps>) => {
  const onClickNewButton = () => {
    onSelectChat(undefined);
  };

  const onClickChatItem = (chatId: string) => {
    onSelectChat(chatId);
  };

  return (
    <Container className={className}>
      <ButtonWrapper>
        <CrateChatButton onClick={onClickNewButton}>New</CrateChatButton>
      </ButtonWrapper>
      <ChatListWrapper>
        {chatsData?.map((item) => {
          return (
            <ChatItem
              key={item.chat_id}
              $isSelected={item.chat_id === selectedChatId}
              onClick={() => onClickChatItem(item.chat_id)}
            >
              <ChatFirstQuestion>{item.dialogues[0].completion}</ChatFirstQuestion>
              <ChatModelName>{item.chat_model_name}</ChatModelName>
            </ChatItem>
          );
        })}
      </ChatListWrapper>
    </Container>
  );
};

export default ChatList;
