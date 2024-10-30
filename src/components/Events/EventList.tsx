// src/components/Events/EventList.tsx
import React, { useEffect, useState } from 'react';
import { VStack, Box, Text } from '@chakra-ui/react';
import useMockEvents from '../../hooks/useMockEvents';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch events using a mock hook
    const fetchEvents = async () => {
      const data = await useMockEvents();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  if (events.length === 0) {
    return <Text>No events available.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {events.map((event) => (
        <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            {event.title}
          </Text>
          <Text>{event.description}</Text>
          <Text fontSize="sm" color="gray.500">
            {event.date}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};

export default EventList;
