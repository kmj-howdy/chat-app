import Chat from '@/components/Chat';
import ChatList from '@/components/ChatList';
import styled from 'styled-components';

const Container = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;
  border: 1px solid green;
`;

const StyledChatList = styled(ChatList)`
  min-width: 30%;
  border: 1px solid red;
`;

const StyledChat = styled(Chat)`
  min-width: 70%;
  border: 1px solid blue;
`;

const Main = () => {
  return (
    <Container>
      <StyledChatList />
      <StyledChat />
    </Container>
  );
};

export default Main;
