import { useState, type ReactNode } from "react";
import type { AuthSession } from "../models/AuthSession";
import type { UserLogin } from "../models/User";
import { login } from "../services/notesService";
import { AuthContext } from "./AuthContext";
import { clearAuthSession, readAuthSession, saveAuthSession } from "../lib/authStorage";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authSession, setAuthSession] = useState<AuthSession | null>(() => readAuthSession());

  async function signIn(credentials: UserLogin) {
    const session = await login<AuthSession>(credentials);
    setAuthSession(session);
    saveAuthSession(session);
  }

  function signOut() {
    setAuthSession(null);
    clearAuthSession();
  }

  return <AuthContext.Provider value={{ authSession, signIn, signOut }}>{children}</AuthContext.Provider>;
}
