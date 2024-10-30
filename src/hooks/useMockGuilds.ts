// src/hooks/useMockGuilds.ts
import { useEffect, useState } from 'react';

interface Guild {
  id: string;
  name: string;
  description: string;
}

const useMockGuilds = (): Promise<Guild[]> => {
  return new Promise((resolve) => {
    // Mock data
    const guilds = [
      { id: '1', name: 'Guild One', description: 'First guild description.' },
      { id: '2', name: 'Guild Two', description: 'Second guild description.' },
    ];

    // Simulate a network delay
    setTimeout(() => {
      resolve(guilds);
    }, 500);
  });
};

export default useMockGuilds;
