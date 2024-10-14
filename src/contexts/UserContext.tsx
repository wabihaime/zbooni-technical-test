import { User } from "@/types/user";
import React, { createContext, useState } from "react";

// defining the UserContextProps interface
interface UserContextProps {
  user: Partial<User> | null;
  setUser: (user: Partial<User> | null) => void;
}

// create context here with initial values
export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

// create UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
