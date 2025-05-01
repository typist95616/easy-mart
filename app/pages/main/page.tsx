"use client";

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Banner from '../../components/banner';
import ProductCard from '../../components/productCard';
import BestSeller from '../../components/bestSeller';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/Product';
import Image from 'next/image';
import banner from "../../images/Banners.png";
import "./main.css";
import TrendingFavorites from '../../components/trendingFavorites';

export default function Home() {
    return (
        <div>
            <Navbar />
            <div className='main-content'>
                <Banner />
                <BestSeller />
                <TrendingFavorites />
            </div>
            <Footer />
        </div>
    )
}