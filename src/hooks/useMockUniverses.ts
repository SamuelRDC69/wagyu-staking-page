// src/hooks/useMockUniverses.ts
import { useEffect, useState } from 'react';
import { Session } from '@wharfkit/session';

interface Universe {
  id: string;
  name: string;
}

const useMockUniverses = (session: Session | null): Promise<Universe[]> => {
  return new Promise((resolve) => {
    // Mock data
    const universes = [
      { id: '1', name: 'Universe A' },
      { id: '2', name: 'Universe B' },
    ];

    // Simulate a network delay
    setTimeout(() => {
      resolve(universes);
    }, 500);
  });
};

export default useMockUniverses;
