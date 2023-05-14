import { createContext, useReducer, useEffect } from "react";

type UserContextProviderType = {
  children: React.ReactNode;
};

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const UserContext = createContext({} as any);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("Auth state", state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
