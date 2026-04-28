export interface AuthSession {
    email: string;
    token: string | null;
    expiresAt: string;
    permissions: string[] | string;
}
