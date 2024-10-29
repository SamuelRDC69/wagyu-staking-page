// src/hooks/useBlockchainData.ts
import { useState, useEffect } from 'react';
import { Session } from '@wharfkit/session';

interface BlockchainData {
  projectedRewards: number;
  cooldownEndTime: Date;
  riskLevel: number;
}

const useBlockchainData = (session: Session | null): BlockchainData => {
  const [projectedRewards, setProjectedRewards] = useState<number>(0);
  const [cooldownEndTime, setCooldownEndTime] = useState<Date>(new Date());
  const [riskLevel, setRiskLevel] = useState<number>(0);

  useEffect(() => {
    if (!session) {
      return;
    }

    // TODO: Fetch data from the blockchain using session
    // Placeholder data for now
    setProjectedRewards(75); // Replace with actual data
    setCooldownEndTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000)); // Replace with actual data
    setRiskLevel(65); // Replace with actual data
  }, [session]);

  return { projectedRewards, cooldownEndTime, riskLevel };
};

export default useBlockchainData;
