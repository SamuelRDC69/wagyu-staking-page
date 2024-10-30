// src/components/Dashboard/CooldownCountdown.tsx
import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

interface CooldownCountdownProps {
  cooldownEndTime: Date;
}

const CooldownCountdown: React.FC<CooldownCountdownProps> = ({ cooldownEndTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = cooldownEndTime.getTime() - now;

      if (distance <= 0) {
        setTimeLeft('Ready to claim!');
        clearInterval(timerId);
      } else {
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [cooldownEndTime]);

  return (
    <Box textAlign="center" mb={4}>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={2}>
        Next Claim Available In:
      </Text>
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="red.500">
        {timeLeft}
      </Text>
    </Box>
  );
};

export default CooldownCountdown;
