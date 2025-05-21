import { useContext } from "react";
import {AuthContext} from "../context/AuthContext";

/**
 * Custom hook to access authentication context.
 * Usage: const { user, login, logout } = useAuth();
 */
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default useAuth;
