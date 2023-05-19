import React, { useState, useEffect } from 'react';
import { Flex, Avatar, Icon, Text, Box } from '@chakra-ui/react';
import { ArrowBackIcon, EditIcon } from '@chakra-ui/icons';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { getChatData } from '../utils/api';

const Header = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [headerText, setHeaderText] = useState('My App Header');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  useEffect(() => {
    fetchChatData();
  }, []);

  const fetchChatData = async () => {
    try {
      const response = await getChatData(0);
      setFrom(response.from);
      setTo(response.to);
      setHeaderText(response.name);
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setHeaderText(e.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Flex
        py={4}
        position="sticky"
        top={0}
        zIndex={999}
        marginRight={10}
        align="center"
        justify="space-between"
        px={4}
      >
        <Flex align="center">
          <ArrowBackIcon boxSize={22} marginLeft={10} marginRight={35} />
          {isEditing ? (
            <input
              type="text"
              value={headerText}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          ) : (
            <>
              <Text fontSize="xl" fontWeight="bold" marginRight={2}>
                {headerText}
              </Text>
            </>
          )}
        </Flex>
        <EditIcon boxSize={22} onClick={handleEditClick} />
      </Flex>

      <Flex
        py={4}
        position="sticky"
        top={55}
        marginLeft={10}
        marginRight={10}
        zIndex={998}
        align="center"
        justify="space-between"
        px={4}
      >
        <Flex align="center">
          <Avatar
            height={50}
            width={50}
            borderRadius={30}
            name='Group Icon'
            src="https://w7.pngwing.com/pngs/269/897/png-transparent-family-cosmetic-dentistry-family-smile-happy-family-child-photography-people.png"
            marginRight={20}
          />
          <Box textAlign="start">
            <Text>
              From <strong>{from}</strong>
            </Text>
            <Text>
              To <strong>{to}</strong>
            </Text>
          </Box>
        </Flex>
        <Icon as={BiDotsVerticalRounded} boxSize={22} />
      </Flex>

      <Box paddingTop={5} borderBottom="1px solid lightgrey" />
    </>
  );
};

export default Header;
