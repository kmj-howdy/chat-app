import styled from 'styled-components';
import { PropsWithClassName } from '@/types';

const Container = styled.div``;

type ChatListProps = {};

const ChatList = ({ className }: PropsWithClassName<ChatListProps>) => {
  return <Container className={className}>ChatList</Container>;
};

export default ChatList;
