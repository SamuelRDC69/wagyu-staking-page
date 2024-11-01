// src/components/Dashboard/DashboardHeader.tsx
import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { UserContext } from '../../contexts/UserContext';

const DashboardHeader: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext not found');
  }

  const { session } = userContext;

  const actorName = session && session.actor ? session.actor.toString() : 'User';

  return (
    <Box width="100%" textAlign="center" mb={4}>
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold">
        Welcome, {actorName}
      </Text>
      <Text fontSize={{ base: 'sm', md: 'md' }}>Your StakeQuest Dashboard</Text>
    </Box>
  );
};

export default DashboardHeader;
