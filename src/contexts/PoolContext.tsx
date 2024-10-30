// src/contexts/PoolContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface PoolContextProps {
  selectedPool: string | null;
  setSelectedPool: React.Dispatch<React.SetStateAction<string | null>>;
}

export const PoolContext = createContext<PoolContextProps | undefined>(undefined);

interface PoolProviderProps {
  children: ReactNode;
}

export const PoolProvider: React.FC<PoolProviderProps> = ({ children }) => {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  return (
    <PoolContext.Provider value={{ selectedPool, setSelectedPool }}>
      {children}
    </PoolContext.Provider>
  );
};
