// src/contexts/EventContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface EventContextProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

export const EventContext = createContext<EventContextProps | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};
