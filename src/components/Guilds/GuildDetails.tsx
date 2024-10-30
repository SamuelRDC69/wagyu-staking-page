// src/components/Guilds/GuildDetails.tsx
import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { GuildContext } from '../../contexts/GuildContext';

interface Guild {
  id: string;
  name: string;
  description: string;
}

interface RouteParams {
  guildId?: string;
  [key: string]: string | undefined; // Add index signature to satisfy TypeScript
}

const GuildDetails: React.FC = () => {
  const { guildId } = useParams<RouteParams>();
  const { guilds } = useContext(GuildContext) || { guilds: [] };
  const guild = guilds.find((g) => g.id === guildId);

  if (!guild) {
    return <Text>Guild not found.</Text>;
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold">
        {guild.name}
      </Text>
      <Text>{guild.description}</Text>
      {/* Add more guild details as needed */}
    </Box>
  );
};

export default GuildDetails;
