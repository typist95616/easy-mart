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
import OrderNowYourGrocery from '../../components/orderNowYourGrocery';
import OrderNow from '../../components/orderNow';
import NavbarV2 from '@/app/components/NavBarV2';

export default function Home() {
    return (
        <div>
            <NavbarV2 />
            <div className='main-content'>
                <Banner />
                <BestSeller />
                <TrendingFavorites bgColor="whiteBackground"/>
                <OrderNowYourGrocery />
                <TrendingFavorites bgColor="greyBackground"/>
                <OrderNow />
            </div>
            <Footer />
        </div>
    )
}