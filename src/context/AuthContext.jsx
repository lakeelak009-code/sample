// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    if (token) {
      api
        .get("auth/profile/")
        .then((res) => {
          setUser(res.data);
          setIsLoggedIn(true);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post("auth/login/", { username, password });

      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);

      const profile = await api.get("auth/profile/");
      setUser(profile.data);
      setIsLoggedIn(true);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.detail || "Invalid credentials",
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      await api.post("auth/register/", {
        username,
        email,
        password,
      });

      return await login(username, password);
    } catch (err) {
      return {
        success: false,
        error:
          err.response?.data?.username?.[0] ||
          err.response?.data?.email?.[0] ||
          "Signup failed",
      };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};