import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

const TOKEN_KEY = "freight_token";
const USER_KEY = "freight_user";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(response.data);
        localStorage.setItem(USER_KEY, JSON.stringify(response.data));
      } catch (error) {
        logout();
      }
    };

    syncUser();
  }, [token]);

  const saveSession = (sessionToken, sessionUser) => {
    setToken(sessionToken);
    setUser(sessionUser);
    localStorage.setItem(TOKEN_KEY, sessionToken);
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      const data = response.data;
      saveSession(data.token, data.user);
      return data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
        withCredentials: true,
      });
      const data = response.data;
      saveSession(data.token, data.user);
      return data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(token && user),
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
