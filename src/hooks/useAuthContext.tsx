import { AuthContext, AuthContextValue } from "../contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = (): AuthContextValue => {
  const context: AuthContextValue | undefined = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
