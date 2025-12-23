import React, { createContext, useContext, useEffect, useState } from "react";

// ================= CONTEXT =================
const AuthContext = createContext();

// ================= JWT PARSER =================
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

// ================= PROVIDER =================
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔄 INITIAL AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    const decoded = parseJwt(token);

    if (!decoded || decoded.exp * 1000 < Date.now()) {
      localStorage.clear();
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  // 🔐 LOGIN
  const login = (data) => {
    localStorage.setItem("accessToken", data.jwtToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userName", data.fullName);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRole", data.role);

    setIsAuthenticated(true);
  };

  // 🔓 LOGOUT
  const logout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
    } catch (e) {
      console.error("Logout API failed", e);
    } finally {
      localStorage.clear();
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ================= CUSTOM HOOK =================
export const useAuth = () => useContext(AuthContext);
