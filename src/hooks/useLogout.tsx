import { useAuthContext } from "./useAuthContext";

interface LogoutProps {
  logout: () => void;
}

export const useLogout = (): LogoutProps => {
  const { dispatch } = useAuthContext();

  const logout = (): void => {
    // Remove user from storage
    localStorage.removeItem("user");

    // Dispatch logout action with an empty payload
    dispatch({ type: "LOGOUT", payload: null }); // Or you can use an empty object {}
  };

  return { logout };
};
