import { createContext } from "react";
import { useActiveID } from "../lib/hooks";

type ActiveIdContext = {
 activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null >(null);

export default function ActiveIdContextProvider({children}: {children: React.ReactNode}) {

    const activeId = useActiveID();

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  )
}

