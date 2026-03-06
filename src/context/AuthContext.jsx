import { createContext, useState, } from "react"

export const AuthContext=createContext();

export function AuthProvider({children}){
    const[loggedInUser,setLoggedInUser]=useState(null);

    function login(user){
        setLoggedInUser(user)
    }
    function logout(user){
        setLoggedInUser(null)
    }

    return (
<AuthContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}