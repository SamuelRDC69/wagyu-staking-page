// src/components/Dashboard/ClaimProjectionGauge.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

interface ClaimProjectionGaugeProps {
  projectedRewards: number;
}

const ClaimProjectionGauge: React.FC<ClaimProjectionGaugeProps> = ({ projectedRewards }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={2}>
        Projected Rewards
      </Text>
      <CircularProgress
        value={projectedRewards}
        size={{ base: '100px', md: '120px' }}
        color="green.400"
      >
        <CircularProgressLabel fontSize={{ base: 'md', md: 'lg' }}>
          {projectedRewards}%
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
};

export default ClaimProjectionGauge;
