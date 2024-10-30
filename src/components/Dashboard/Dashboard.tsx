// src/components/Dashboard/Dashboard.tsx
import React, { useContext } from 'react';
import { VStack } from '@chakra-ui/react';

import DashboardHeader from './DashboardHeader';
import ClaimProjectionGauge from './ClaimProjectionGauge';
import CooldownCountdown from './CooldownCountdown';
import RiskMeter from './RiskMeter';
import { UserContext } from '../../contexts/UserContext';
import useBlockchainData from '../../hooks/useBlockchainData';

const Dashboard: React.FC = () => {
  const { session } = useContext(UserContext);

  if (!session) {
    return null;
  }

  const { projectedRewards, cooldownEndTime, riskLevel } = useBlockchainData(session);

  return (
    <VStack spacing={{ base: 4, md: 6 }} width="100%" px={{ base: 2, md: 4 }}>
      <DashboardHeader />
      <ClaimProjectionGauge projectedRewards={projectedRewards} />
      <CooldownCountdown cooldownEndTime={cooldownEndTime} />
      <RiskMeter riskLevel={riskLevel} />
    </VStack>
  );
};

export default Dashboard;
