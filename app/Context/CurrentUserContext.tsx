"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/User";

interface currentUserContextType {
    currentUser: User | undefined;
    setCurrentUser: (user: User | undefined) => void;
    setCurrentUserToLocal: (user: User | undefined) => void;
}

const currentUserContext = createContext<currentUserContextType | undefined>(undefined);

export const useCurrentUser = () => {
    const context = useContext(currentUserContext);
    if (context === undefined) {
        throw new Error("useCurrentUser must be used in a CurrentUser Provider");
    }
    return context;
}

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {

    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    // Use useEffect to access localStorage only in the client
    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            setCurrentUser(JSON.parse(user)); // Parse user from localStorage
        }
    }, []); // Runs only once when the component mounts

    const setCurrentUserToLocal = (user: User | undefined) => {
        if (user === undefined) {
            localStorage.removeItem("currentUser");
            setCurrentUser(undefined);
            return;
        } else {
            setCurrentUser(user);
            console.log("current User set to local storage")
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
    }

    return (
        <currentUserContext.Provider value={{ currentUser, setCurrentUser, setCurrentUserToLocal }}>
            {children}
        </currentUserContext.Provider>
    )
}

