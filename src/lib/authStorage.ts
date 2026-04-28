import type { AuthSession } from "../models/AuthSession";

const AUTH_SESSION_KEY = "auth_session";

export function readAuthSession(): AuthSession | null {
  const rawSession = localStorage.getItem(AUTH_SESSION_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
}

export function saveAuthSession(session: AuthSession): void {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

export function readAuthToken(): string | null {
  return readAuthSession()?.token ?? null;
}
