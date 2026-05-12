import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { FamilyRole } from "./voicemed-data";
import { roleLabels } from "./voicemed-data";

interface AuthState {
  isLoggedIn: boolean;
  role: FamilyRole;
  userName: string;
}

interface AuthContextType extends AuthState {
  login: (role?: FamilyRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "voicemed_auth";
const defaultAuth: AuthState = { isLoggedIn: false, role: "owner", userName: "" };

function loadAuth(): AuthState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultAuth;
    const parsed = JSON.parse(saved) as AuthState;
    if (parsed.isLoggedIn && parsed.role && parsed.userName) return parsed;
  } catch {
    // Ignore corrupted prototype auth.
  }
  return defaultAuth;
}

function saveAuth(state: AuthState) {
  try {
    if (state.isLoggedIn) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(loadAuth);

  useEffect(() => {
    saveAuth(auth);
  }, [auth]);

  const login = (role: FamilyRole = "owner") => {
    setAuth({ isLoggedIn: true, role, userName: `คุณภัทร · ${roleLabels[role]}` });
  };

  const logout = () => {
    setAuth(defaultAuth);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return <AuthContext.Provider value={{ ...auth, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
