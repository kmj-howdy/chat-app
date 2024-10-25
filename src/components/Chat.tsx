import { ClassName } from '@/types/style';
import styled from 'styled-components';

const Container = styled.div``;

const Chat = ({ className }: ClassName) => {
  return <Container className={className}>Chat</Container>;
};

export default Chat;
