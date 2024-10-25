import { PropsWithClassName } from '@/types';
import styled from 'styled-components';

const Container = styled.div``;

type ChatProps = {};

const Chat = ({ className }: PropsWithClassName<ChatProps>) => {
  return <Container className={className}>Chat</Container>;
};

export default Chat;
