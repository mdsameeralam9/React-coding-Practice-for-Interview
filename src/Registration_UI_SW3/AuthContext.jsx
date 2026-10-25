import { createContext, useContext, useMemo, useState } from "react";
import { getProfile, loginUser, logoutUser } from "./api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(credentials) {
    await loginUser(credentials);
    const response = await getProfile();
    const profile =
      response?.data?.profile ??
      response?.data?.user ??
      response?.data ??
      response?.profile ??
      response?.user ??
      response;

    setUser({
      name: profile?.name ?? profile?.fullName ?? "Your profile",
      email: profile?.email ?? credentials.email,
      role: profile?.role ?? profile?.occupation ?? "",
      image:
        profile?.profileImageBase64 ??
        profile?.profileImage ??
        profile?.profilePicture ??
        profile?.image ??
        "",
      memberSince: profile?.createdAt ?? profile?.memberSince ?? "",
    });
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), login, logout }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
