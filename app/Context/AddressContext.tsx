"use client";

import React, { createContext, ReactNode, useContext, useReducer, useState } from "react";
import { Address } from "../types/Address";

interface AddressContextType {
    addressList: Address[];
    addToAddressList: (address: Address) => void;
    editAddress: (address: Address) => void;
    currentAddress: Address | undefined;
    setCurrentAddress: (address: Address | undefined) => void;
    saveAddressToDB: (address: Address) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (context === undefined) {
        throw new Error("Address Context must be used within a AddressProvider");
    }
    return context;
};

export const AddressProvider = ({ children }: { children: ReactNode }) => {

    const [addressList, setAddressList] = useState<Address[]>([]);
    const [currentAddress, setCurrentAddress] = useState<Address | undefined>();

    const addToAddressList = (address: Address) => {
        setAddressList(prevList => {
            const existing = prevList.find(i => i.name === address.name)
            if (!existing) {
                return [...prevList, address];
            } else {
                return [...prevList]
            }
        });
    }

    const editAddress = (updatedAddress: Address) => {
        setAddressList(prevList =>
            prevList.map(addr =>
                addr.place_id === updatedAddress.place_id ? { ...addr, ...updatedAddress } : addr
            )
        );
    };

    const saveAddressToDB = async (address: Address) => {
        // Check if user logged
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('User not logged in');
        }
        
        // api to save address to db
        const response = await fetch('/api/saveAddressToDB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })

        if (!response.ok) {
            throw new Error("falied to save address to database");
        }

        const data = await response.json();
        console.log(data);
    }

    return (
        <AddressContext.Provider value={{ addressList, addToAddressList, editAddress, currentAddress, setCurrentAddress, saveAddressToDB }}>
            {children}
        </AddressContext.Provider>
    );
}
