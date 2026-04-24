import {createContext, useContext, useState, type ReactNode } from "react";
import { login as loginService } from "../services/notesService";
import type { UserLogin } from "../models/User";
import type { LoggedUser } from "../models/LoggedUser";

interface UserAuthenticationContextType{
    userLogged : LoggedUser | null;
    setUserLogged: (userLogged: LoggedUser | null) => void;

}


export const UserContext = createContext<UserAuthenticationContextType | null> (null);

interface UserContextProps{
    children: ReactNode;
}

export function UserContextProvider({children}: UserContextProps){
    const [userLogged, setUserLogged] = useState<LoggedUser | null> (null);

    return (
        <UserContext.Provider value={{userLogged, setUserLogged}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser():UserAuthenticationContextType{

    const context = useContext(UserContext);

    if(!context){
        throw new Error();
    }

    return context;
} 