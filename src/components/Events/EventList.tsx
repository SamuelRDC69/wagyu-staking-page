// src/components/Events/EventList.tsx
import React, { useEffect, useContext } from 'react';
import { VStack, Box, Text, Link } from '@chakra-ui/react';
import { EventContext } from '../../contexts/EventContext';
import useMockEvents from '../../hooks/useMockEvents';
import { Link as RouterLink } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

const EventList: React.FC = () => {
  const { events, setEvents } = useContext(EventContext) || {};

  useEffect(() => {
    // Fetch events using a mock hook
    const fetchEvents = async () => {
      const data = await useMockEvents();
      setEvents?.(data);
    };

    fetchEvents();
  }, [setEvents]);

  if (!events || events.length === 0) {
    return <Text>No events available.</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      {events.map((event) => (
        <Box key={event.id} p={4} borderWidth="1px" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold">
            <Link as={RouterLink} to={`/events/${event.id}`}>
              {event.title}
            </Link>
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
