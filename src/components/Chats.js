import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Flex, Avatar } from '@chakra-ui/react';
import { getChatData } from '../utils/api';
import { format } from 'date-fns';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [firstDate, setFirstDate] = useState(null);
  const [receiverId, setReceiverId] = useState('');
  const [page, setPage] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    fetchChats();
  }, []); 

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    const { scrollTop, clientHeight, scrollHeight } = container;
    if (scrollHeight - scrollTop === clientHeight) {
      // User scrolled to the bottom
      loadMoreChats();
    }
  };

  const fetchChats = async () => {
    try {
      const response = await getChatData(page);
      const sortedChats = response.chats.sort((a, b) =>
        a.id.localeCompare(b.id)
      );
      setChats(sortedChats);
      setFirstDate(sortedChats[0].time);

      // Set the receiverId based on the first chat's receiver user_id
      const firstChat = sortedChats[0];
      setReceiverId(firstChat.sender.user_id);
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const loadMoreChats = async () => {
    try {
      const nextPage = page + 1;
      const response = await getChatData(nextPage);
      const newChats = response.chats.sort((a, b) =>
        a.id.localeCompare(b.id)
      );
      setChats((prevChats) => [...prevChats, ...newChats]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more chats:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'dd MMM, yyyy');
  };

  return (
    <Box flex="1" overflowY="auto" p={4} ref={containerRef}>
      {firstDate && (
        <Flex align="center" mb={4}>
          <hr
            style={{ flexGrow: 1, borderColor: 'lightgrey', margin: '0 10px' }}
          />
          <Text>{formatDate(firstDate)}</Text>
          <hr
            style={{ flexGrow: 1, borderColor: 'lightgrey', margin: '0 10px' }}
          />
        </Flex>
      )}

      {chats.map((chat) => (
        <Flex
          key={chat.id}
          margin={20}
          padding={10}
          borderWidth="1px"
          borderRadius="10"
          bg={chat.sender.user_id === receiverId ? '#1C63D5' : 'white'}
          flexDirection="row"
          alignItems="flex-end" // Aligns avatar at the end or bottom
        >
          <Box>
            {chat.sender.user_id !== receiverId && (
              <Avatar
                height={38}
                width={38}
                borderRadius={20}
                src={chat.sender.image}
                ml={2}
                zIndex={1}
              />
            )}
          </Box>
          <Box ml={chat.sender.user_id !== receiverId ? 4 : 0}>
            <Text color={chat.sender.user_id === receiverId ? 'white' : 'black'}>
              {chat.message}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default Chats;