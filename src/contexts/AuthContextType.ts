import type { UserLogin } from "../models/User";
import type { AuthSession } from "../models/AuthSession";

export interface AuthContextType {
  authSession: AuthSession | null;
  signIn: (credentials: UserLogin) => Promise<void>;
  signOut: () => void;
}
