import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  // Sync user state to sessionStorage
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  // Login
  const login = (userData) => {
    setUser(userData);
  };

  // Logout
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token"); // Optional if you're storing token in sessionStorage
    sessionStorage.removeItem("refreshToken");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Optional default export
export default AuthContext;
