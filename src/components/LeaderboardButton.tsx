// src/components/LeaderboardButton.tsx
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LeaderboardButton = () => {
  const navigate = useNavigate();

  return (
    <Button colorScheme="blue" onClick={() => navigate('/leaderboard')}>
      Go to Leaderboard
    </Button>
  );
};

export default LeaderboardButton;
