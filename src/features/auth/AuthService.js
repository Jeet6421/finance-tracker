
import api from "../../services/api";

const AuthService = {
  login: async ({ email, password }) => {
    try {
      const res = await api.post("/login", { email, password });

      const token = res.data.token || res.data.accessToken || res.data.jwt;
      const refreshToken = res.data.refreshToken || null;
      const user = res.data.user || { email };

      if (!token) {
        console.error("No token received:", res.data);
        return { success: false, message: "Invalid response from server" };
      }

      // Save tokens & user data
      sessionStorage.setItem("token", token);
      if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("user", JSON.stringify(user));

      // Set default header for future requests
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, token, user };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      console.error("Login error:", error);
      return { success: false, message };
    }
  },

  register: async ({ firstName, lastName, email, password }) => {
    try {
      const res = await api.post("/register", {
        firstName,
        lastName,
        email,
        password,
      });
      return { success: true, data: res.data };
    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed. Please try again.";
      console.error("Register error:", error);
      return { success: false, message };
    }
  },

  logout: () => {
    sessionStorage.clear();
    delete api.defaults.headers.common["Authorization"];
  },

  getCurrentUser: () => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (token && user) {
      return {
        token,
        user: JSON.parse(user),
      };
    }
    return null;
  },
};

export default AuthService;
