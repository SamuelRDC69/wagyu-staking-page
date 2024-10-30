// src/hooks/useMockEvents.ts
import { useEffect, useState } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const useMockEvents = (): Promise<Event[]> => {
  return new Promise((resolve) => {
    // Mock data
    const events = [
      {
        id: '1',
        title: 'Event One',
        description: 'Description for event one.',
        date: '2023-08-01',
      },
      {
        id: '2',
        title: 'Event Two',
        description: 'Description for event two.',
        date: '2023-08-15',
      },
    ];

    // Simulate a network delay
    setTimeout(() => {
      resolve(events);
    }, 500);
  });
};

export default useMockEvents;
