"use client";

import React, {createContext, ReactNode, useContext, useEffect, useReducer, useState} from "react";
 
interface tokenContextType {
    token: string | undefined;
    getToken: () => string | undefined;
    setPageToken: (token: string) => void;
    clearToken: () => void;
}

const TokenContext = createContext<tokenContextType | undefined>(undefined);

export const useToken = () => {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
}

export const TokenProvider = ({ children } : { children: ReactNode}) => {

    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []); // Empty dependency array means this runs once on mount

    const getToken = () => {
        return token;
    }

    const setPageToken = (token: string) => {
        setToken(token);
        localStorage.setItem("token", token);
    }

    const clearToken = () => {
        setToken(undefined);
        localStorage.removeItem("token");
    }

    return (
        <TokenContext.Provider value={{token, getToken, setPageToken, clearToken}}>
            {children}
        </TokenContext.Provider>
    )
}