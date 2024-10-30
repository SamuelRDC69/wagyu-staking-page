// src/hooks/useMockPools.ts
import { useEffect, useState } from 'react';

interface Pool {
  id: string;
  name: string;
}

const useMockPools = (): Promise<Pool[]> => {
  return new Promise((resolve) => {
    // Mock data
    const pools = [
      { id: '1', name: 'Pool Alpha' },
      { id: '2', name: 'Pool Beta' },
    ];

    // Simulate a network delay
    setTimeout(() => {
      resolve(pools);
    }, 500);
  });
};

export default useMockPools;
