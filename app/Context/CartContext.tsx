"use client";

import React, {createContext, ReactNode, useContext, useReducer, useState} from "react";

export interface CartItem {
    id: number;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    // removeFromCart: (id: number, quantity: number) => void;
    // clearCart: () => void;
    getTotalQuantity: () => number;
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

    return (
        <CartContext.Provider value={{cart, addToCart, getTotalQuantity }}>
            {children}
        </CartContext.Provider>
    )
};

