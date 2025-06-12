import { atom, useAtom } from "jotai";
import { useEffect } from "react";

// export const tokenAtom = atom<string | undefined>(localStorage.getItem("token") || undefined);

// Define the atom with an initial state of undefined
export const tokenAtom = atom<string | undefined>(undefined);

// Custom hook to manage the token
export const useTokenAtom = () => {
    const [token, setToken] = useAtom(tokenAtom);

    // Load the token from localStorage when the component mounts
    useEffect(() => {
        console.log("useEffect running")
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
    }, [setToken]);

    return { token, setToken };
};