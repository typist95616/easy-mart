"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { Address } from "../types/Address";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";

interface AddressContextType {
    addressList: Address[] | null;
    setAddressesList: (addresses: Address[]) => Promise<void>;
    addToAddressList: (address: Address) => Promise<void>;
    editAddress: (address: Address) => Promise<void>;
    currentAddress: Address | undefined;
    setCurrentAddress: (address: Address | undefined) => void;
    clear: () => Promise<void>;
}

const currentAddressAtom = atom<Address | undefined>(undefined);

export const useAddress = (): AddressContextType => {
    const [currentAddress, setCurrentAddress] = useAtom<Address | undefined>(currentAddressAtom);
    const queryClient = useQueryClient();
    const queryResult = useQuery({
        queryKey: ['addressList'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return null;
            }
            const response = await fetch('/api/getUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("falied to fetch address list from database");
            }

            const data = await response.json();
            return data.address;
        }
    });
    const addressList: Address[] | null = queryResult.data;

    const addToAddressListNewState = (address: Address) => {
        const list = addressList ?? [];
        const existing = list.find(i => i.name === address.name);
        if (!existing) {
            console.log("new address list after added: ", [...list, address]);
            return [...list, address];
        }
        return list;
    }

    const setAddressesList = async (addresses: Address[]) => {
        await saveAddressToDB(addresses);
    }

    const addToAddressList = async (address: Address) => {
        const newAddressList = addToAddressListNewState(address);
        await saveAddressToDB(newAddressList);
    }

    const editAddress = async (updatedAddress: Address) => {
        const list = addressList ?? [];
        const newList = list.map(addr =>
            addr.place_id === updatedAddress.place_id ? { ...addr, ...updatedAddress } : addr
        );
        await saveAddressToDB(newList);
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

        await queryClient.invalidateQueries({ queryKey: ['addressList'] });
        console.log(data);
    }

    const clear = async () => {
        setCurrentAddress(undefined);
        await queryClient.invalidateQueries({ queryKey: ['addressList'] });
    }

    return { addressList, setAddressesList, addToAddressList, editAddress, currentAddress, setCurrentAddress, clear };
}
