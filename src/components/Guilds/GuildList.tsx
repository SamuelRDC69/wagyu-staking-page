// src/components/Guilds/GuildList.tsx
import React, { useEffect, useContext } from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import { GuildContext } from '../../contexts/GuildContext';
import useMockGuilds from '../../hooks/useMockGuilds';

const GuildList: React.FC = () => {
  const { guilds, setGuilds } = useContext(GuildContext) || {};

  useEffect(() => {
    // Fetch guilds using a mock hook
    const fetchGuilds = async () => {
      const data = await useMockGuilds();
      setGuilds?.(data);
    };

    fetchGuilds();
  }, [setGuilds]);

  if (!guilds || guilds.length === 0) {
    return <Text>No guilds available.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {guilds.map((guild) => (
        <Box key={guild.id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            {guild.name}
          </Text>
          <Text>{guild.description}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default GuildList;
