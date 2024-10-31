// src/components/Guilds/GuildList.tsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GuildContext } from '../../contexts/GuildContext';
import { Box, Text, VStack } from '@chakra-ui/react';

interface Guild {
  id: string;
  name: string;
  description: string;
}

// Update this interface to ensure `guilds` is present in GuildContextProps
interface GuildContextProps {
  guilds: Guild[]; // Ensure guilds is part of the context props
}

const GuildList: React.FC = () => {
  const guildContext = useContext(GuildContext) as GuildContextProps; // Explicitly cast to ensure guilds exists
  const guilds = guildContext?.guilds || []; // Use optional chaining to handle undefined context

  if (guilds.length === 0) {
    return <Text>No guilds available.</Text>;
  }

  return (
    <VStack spacing={4}>
      {guilds.map((guild: Guild) => (
        <Box
          key={guild.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          width="100%"
        >
          <Link to={`/guilds/${guild.id}`}>
            <Text fontSize="lg" fontWeight="bold">{guild.name}</Text>
            <Text>{guild.description}</Text>
          </Link>
        </Box>
      ))}
    </VStack>
  );
};

export default GuildList;
