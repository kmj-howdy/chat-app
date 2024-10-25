import ChatScreen from '@/components/ChatScreen';
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

const StyledChatScreen = styled(ChatScreen)`
  min-width: 70%;
  border: 1px solid blue;
`;

const Main = () => {
  return (
    <Container>
      <StyledChatList />
      {/* TODO: chatId 수정 */}
      <StyledChatScreen chatId="1" />
    </Container>
  );
};

export default Main;
