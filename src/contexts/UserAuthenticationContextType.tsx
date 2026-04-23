import {createContext, useContext, useState, type ReactNode } from "react";
import { login as loginService } from "../services/notesService";
import type { UserLogin } from "../models/User";

interface UserAuthenticationContextType{
    token: string | null;
    setAccesToken: (token: string) => void;
    handleContextLogin: (email: string, password: string) => Promise<void>;    // use Promise<void> for aynsc functions which do NOT return;
}


export const UserContext = createContext<UserAuthenticationContextType | null> (null);

interface UserContextProps{
    children: ReactNode;
}

export function UserContextProvider({children}: UserContextProps){

    //Components pull { token } from context -- no need to send the state setter to {children}, ONLY state of token
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("access_token"))
    
    // function setAccesToken(token:string){
    //     localStorage.setItem("access_token", token)
    // }

    const setAccesToken = (newToken: string | null) => {

        setToken(newToken);
        if (newToken){
            localStorage.setItem("access_token", newToken);
        } else{
            localStorage.removeItem("access_token");
        }
    }

    const handleContextLogin = async (email: string, password: string) => {
        let data = await loginService({email, password}) //returns TOKEN STRING { token: string }
        
        setAccesToken(data.token);
    } 

    // let token = localStorage.getItem("access_token");

    return (
        <UserContext.Provider value={{token, setAccesToken, handleContextLogin}}>
            {children}
        </UserContext.Provider>
    )
}

export function useToken():UserAuthenticationContextType{

    const context = useContext(UserContext);

    if(!context){
        throw new Error();
    }

    return context;
}