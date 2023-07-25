import { ReactNode, createContext, useCallback, useContext, useState } from "react";

type TUserContext = {
  userId?: string;
  updateUserId: (newUserId: string) => void;
}

type TUserProviderProps = {
  children: ReactNode;
}

const USER_ID_KEY = 'uid';

const UserContext = createContext<TUserContext>({
  userId: undefined,
  updateUserId: () => undefined,
});

export function UserProvider({ children }: TUserProviderProps) {
  const [userId, setUserId] = useState<string>(window.localStorage.getItem(USER_ID_KEY) || '');

  const updateUserId = useCallback((newUserId: string) => {
    setUserId(newUserId);
    window.localStorage.setItem(USER_ID_KEY, newUserId);
  }, []);

  return (
    <UserContext.Provider value={{ userId, updateUserId }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context: TUserContext = useContext(UserContext);

  return context;
};
