// src/contexts/UserContext.tsx
import React, { createContext } from 'react';
import { Session } from '@wharfkit/session';

interface UserContextProps {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

export const UserContext = createContext<UserContextProps>({
  session: null,
  setSession: () => {},
});

export const UserProvider = UserContext.Provider;
