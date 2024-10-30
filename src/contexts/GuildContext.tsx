// src/contexts/GuildContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface Guild {
  id: string;
  name: string;
  description: string;
}

interface GuildContextProps {
  guilds: Guild[];
  setGuilds: React.Dispatch<React.SetStateAction<Guild[]>>;
}

export const GuildContext = createContext<GuildContextProps | undefined>(undefined);

interface GuildProviderProps {
  children: ReactNode;
}

export const GuildProvider: React.FC<GuildProviderProps> = ({ children }) => {
  const [guilds, setGuilds] = useState<Guild[]>([]);

  return (
    <GuildContext.Provider value={{ guilds, setGuilds }}>
      {children}
    </GuildContext.Provider>
  );
};
