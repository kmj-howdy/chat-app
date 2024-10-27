import styled from 'styled-components';
import { PropsWithClassName } from '@/types/style';
import { Chat } from '@/types/chat';
import { Link, useNavigate, useParams } from 'react-router-dom';

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

const ChatItem = styled(Link)<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;

  padding: 0.5rem;
  border: 1px solid blue;
  background-color: ${(p) => p.$isSelected && p.theme.colors.main};
  color: ${(p) => p.$isSelected && 'white'};
  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.colors.secondary};
  }
`;

const ChatFirstQuestion = styled.p`
  margin-bottom: 0.5rem;
`;

const ChatModelName = styled.span<{ $isSelected: boolean }>`
  display: flex;
  justify-content: flex-end;
  font-size: 10px;
  color: ${(p) => (p.$isSelected ? 'white' : 'grey')};
`;

type ChatListProps = {
  chatsData?: Chat[];
};

const ChatList = ({ chatsData, className }: PropsWithClassName<ChatListProps>) => {
  const navigate = useNavigate();
  const { chatId } = useParams();

  const handleClickNewButton = () => {
    navigate('/chats');
  };

  return (
    <Container className={className}>
      <ButtonWrapper>
        <CrateChatButton onClick={handleClickNewButton}>New</CrateChatButton>
      </ButtonWrapper>
      <ChatListWrapper>
        {chatsData?.map((item) => {
          const isSelected = item.chat_id === chatId;
          return (
            <ChatItem key={item.chat_id} to={`/chats/${item.chat_id}`} $isSelected={isSelected}>
              <ChatFirstQuestion>{item.dialogues[0].prompt}</ChatFirstQuestion>
              <ChatModelName $isSelected={isSelected}>{item.chat_model_name}</ChatModelName>
            </ChatItem>
          );
        })}
      </ChatListWrapper>
    </Container>
  );
};

export default ChatList;
