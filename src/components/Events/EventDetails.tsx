// src/components/Events/EventDetails.tsx
import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../../contexts/EventContext';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface RouteParams {
  eventId: string;
}

const EventDetails: React.FC = () => {
  const { eventId } = useParams<RouteParams>();
  const { events } = useContext(EventContext) || { events: [] };
  const event = events.find((e) => e.id === eventId);

  if (!event) {
    return <Text>Event not found.</Text>;
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold">
        {event.title}
      </Text>
      <Text>{event.description}</Text>
      <Text fontSize="sm" color="gray.500">
        {event.date}
      </Text>
      {/* Add more event details as needed */}
    </Box>
  );
};

export default EventDetails;
