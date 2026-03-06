import { createContext, useState, } from "react"

export const AuthContext=createContext();

export function AuthProvider({children}){
    const[loggedInUser,setLoggedInUser]=useState(
        JSON.parse(localStorage.getItem("loggedInUser"))
    );

    function login(user){
        setLoggedInUser(user)
        localStorage.setItem("loggedInUser",JSON.stringify(user))
    }
    function logout(user){
        setLoggedInUser(null)
        localStorage.removeItem("loggedInUser")
    }

    return (
<AuthContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}