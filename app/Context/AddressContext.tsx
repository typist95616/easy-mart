"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { Address } from "../types/Address";

interface AddressContextType {
    addressList: Address[] | undefined;
    setAddressesList: (addresses: Address[] | undefined) => void;
    addToAddressList: (address: Address) => void;
    editAddress: (address: Address) => void;
    currentAddress: Address | undefined;
    setCurrentAddress: (address: Address | undefined) => void;
    addAddressToListAfterLogin: (addresses: Address) => void;
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

    const [addressList, setAddressList] = useState<Address[] | undefined>([]);
    const [currentAddress, setCurrentAddress] = useState<Address | undefined>();

    const setAddressesList = (addresses: Address[] | undefined) => {
        setAddressList(addresses);
    }

    const addToAddressListNewState = (address: Address) => {
        const list = addressList ?? [];
        const existing = list.find(i => i.name === address.name);
        if (!existing) {
            console.log("new address list after added: ", [...list, address]);
            return [...list, address];
        }
        return list;
    }

    const addToAddressList = async (address: Address) => {
        const newAddressList = addToAddressListNewState(address);
        await saveAddressToDB(newAddressList);
        setAddressList(newAddressList);
    }

    const editAddress = (updatedAddress: Address) => {
        setAddressList(prevList => {
            const list = prevList ?? [];
            return list.map(addr =>
                addr.place_id === updatedAddress.place_id ? { ...addr, ...updatedAddress } : addr
            );
        });
    };

    const saveAddressToDB = async (addressList: Address[]) => {
        // Check if user logged
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('User not logged in');
        }

        console.log("addressList before insert to table", addressList);
        
        // api to save address to db
        const response = await fetch('/api/saveAddressToDB', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(addressList)
        })

        if (!response.ok) {
            throw new Error("falied to save address to database");
        }

        const data = await response.json();
        console.log(data);
    }

    const addAddressToListAfterLogin = (address: Address) => {
        setAddressList(prevList => {
            const list = prevList ?? [];
            return [...list, address];
        });
    }

    return (
        <AddressContext.Provider value={{ addressList, setAddressesList, addToAddressList, editAddress, currentAddress, setCurrentAddress, addAddressToListAfterLogin }}>
            {children}
        </AddressContext.Provider>
    );
}
