/* eslint-disable react/prop-types */
import { createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState({});
    useEffect(()=>{
        const handleTokenChange = () =>{
            setIsAuthenticated(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleTokenChange);
    
    return () =>{
        window.removeEventListener("storage", handleTokenChange);
    } 
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}