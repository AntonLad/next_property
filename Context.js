import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [AppState, setAppState] = useState({});

  const contextValue = useMemo(() => {
    return [AppState, setAppState];
  }, [AppState, setAppState]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}