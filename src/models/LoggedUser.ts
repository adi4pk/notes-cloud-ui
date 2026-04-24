export interface LoggedUser{

    email: string;
    password: string;

    token: string | null;
    expiresAt: string;
    permissions: string;
}