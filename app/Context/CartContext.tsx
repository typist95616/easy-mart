"use client";

import React, {createContext, ReactNode, useContext, useReducer, useState} from "react";

export interface CartItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
    img_url: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    // removeFromCart: (id: number, quantity: number) => void;
    removeOneFromCart: (id: number) => void;
    // clearCart: () => void;
    getTotalQuantity: () => number;
    getTotalPrice: () => number;
    getItemQuantity: (id: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined); 

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }: {children: ReactNode}) => {

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart(prevCart => {
            const existing = prevCart.find(i => i.id === item.id)
            if (existing) {
                return prevCart.map(i => i.id === item.id? { ...i, quantity: i.quantity + item.quantity} : i);
            }
            return [...prevCart, item];
        });
    };

    const getTotalQuantity = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.quantity;
        });
        return total;
    };

    const getItemQuantity = (id:number) => {
        const item = cart.find(item => item.id === id);
        return item? item.quantity : 0;
    }

    const getTotalPrice = () => {
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
        })
        return total;
    }

    const removeOneFromCart = (id: number) => {
        // const item = cart.find(item => item.id === id);
        // if (item) {
        //     item.quantity -= item?.quantity;
        // } else {
        //     return;
        // }
    }

    return (
        <CartContext.Provider value={{cart, addToCart, removeOneFromCart, getTotalQuantity, getTotalPrice, getItemQuantity}}>
            {children}
        </CartContext.Provider>
    )
};

