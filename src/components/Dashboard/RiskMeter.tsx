// src/components/Dashboard/RiskMeter.tsx
import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';

interface RiskMeterProps {
  riskLevel: number;
}

const RiskMeter: React.FC<RiskMeterProps> = ({ riskLevel }) => {
  const riskColor = riskLevel < 50 ? 'green' : riskLevel < 80 ? 'yellow' : 'red';

  return (
    <Box width="100%" mb={4}>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={2} textAlign="center">
        Pool Risk Level
      </Text>
      <Progress colorScheme={riskColor} size="lg" value={riskLevel} />
      <Text fontSize={{ base: 'sm', md: 'md' }} textAlign="right">
        {riskLevel}%
      </Text>
    </Box>
  );
};

export default RiskMeter;
