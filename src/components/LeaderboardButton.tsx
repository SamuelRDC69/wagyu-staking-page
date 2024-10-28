// src/components/LeaderboardButton.tsx
import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LeaderboardButton = () => {
  const navigate = useNavigate();

  return (
    <Flex justify="center" mt={8}>
      <Button colorScheme="blue" size="lg" onClick={() => navigate('/leaderboard')} _hover={{ bg: 'blue.600' }}>
        Go to Leaderboard
      </Button>
    </Flex>
  );
};

export default LeaderboardButton;
