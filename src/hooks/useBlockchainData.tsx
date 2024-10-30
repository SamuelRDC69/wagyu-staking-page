// src/hooks/useBlockchainData.ts
import { useState, useEffect } from 'react';
import { Session } from '@wharfkit/session';

interface BlockchainData {
  projectedRewards: number;
  cooldownEndTime: Date | null;
  riskLevel: number;
}

const useBlockchainData = (session: Session | null): BlockchainData => {
  const [projectedRewards, setProjectedRewards] = useState<number>(0);
  const [cooldownEndTime, setCooldownEndTime] = useState<Date | null>(null);
  const [riskLevel, setRiskLevel] = useState<number>(0);

  useEffect(() => {
    // Exit early if no session (user not logged in)
    if (!session) {
      setProjectedRewards(0);
      setCooldownEndTime(null);
      setRiskLevel(0);
      return;
    }

    // Mock data fetching logic
    const fetchMockData = async () => {
      console.log('Using mock blockchain data...');

      // Simulate a network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Set mock data values
      setProjectedRewards(75); // Mocked projected rewards
      setCooldownEndTime(new Date(new Date().getTime() + 2 * 60 * 60 * 1000)); // 2 hours from now
      setRiskLevel(65); // Mocked risk level
    };

    // Call mock data function
    fetchMockData();
  }, [session]);

  return { projectedRewards, cooldownEndTime, riskLevel };
};

export default useBlockchainData;
