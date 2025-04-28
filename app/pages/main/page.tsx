"use client";

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Banner from '../../components/banner';
import ProductCard from '../../components/productCard';
import ProductSlider from '../../components/productSlider';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/Product';
import Image from 'next/image';
import banner from "../../images/Banners.png";
import orange from "../../images/orange.png";
import "./main.css";

export default function Home() {
    // const [products, setProducts] = useState<Product[]>([]);
    // const [filter, setFilter] = useState([]);

    // const fetchProducts = async () => {
    //     const res = await fetch('/api/products');
    //     const data = await res.json();
    //     setProducts(data);
    // }

    // useEffect(() => {
    //     fetchProducts();
    // }, [filter]);

    // {products.map((product) => 
    //     <div key={product.id}>
    //         <h1>{product.name}</h1>
    //     </div>
    // )}

    return (
        <div>
            <Navbar />
            <div className='main-content'>
                <Banner />
                <ProductCard 
                    productName="Orange"
                    productImage={orange} 
                    pricePerLb={2.71} 
                    totalPrice={54.68} 
                    stock={13}                
                />
            </div>
            <Footer />
        </div>
    )
}