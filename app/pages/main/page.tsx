"use client";

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/Product';

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    return (
        <div>
            <Navbar />
            This is main page

            {products.map((product) => 
                <div key={product.id}>
                    <h1>{product.name}</h1>
                </div>
            )}
            <Footer />
        </div>
    )
}