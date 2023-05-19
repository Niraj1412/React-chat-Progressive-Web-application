import {Flex } from '@chakra-ui/react';
import Header from './Header';
import Chats from './Chats';
import ChatBox from './ChatBox';

function ChatScreen() {
  
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Chats />
      <ChatBox />
    </Flex>
  );
}

export default ChatScreen;
