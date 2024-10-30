// src/contexts/UserContext.tsx
import React, { createContext, useState, FC } from 'react';
import { Session } from '@wharfkit/session';

interface UserContextProps {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

// Correctly declare and export UserContext
export const UserContext = createContext<UserContextProps | undefined>(undefined);

// Define and export UserProvider component
export const UserProvider: FC = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      {children}
    </UserContext.Provider>
  );
};
