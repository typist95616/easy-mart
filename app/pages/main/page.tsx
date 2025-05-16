"use client";

import Navbar from '../../components/navbar';
import FooterV2 from '../../components/FooterV2';
import Banner from '../../components/banner';
// import BestSeller from '../../components/bestSeller';
import ProductSlider from "../../components/SliderComponent/ProductSlider";
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
                {/* <BestSeller Title="Best Seller"/> */}
                <ProductSlider title="Best Seller"></ProductSlider>
                <ProductSlider title="Trending Store Favourites"></ProductSlider>
                {/* <TrendingFavorites bgColor="whiteBackground"/>
                <OrderNowYourGrocery />
                <TrendingFavorites bgColor="greyBackground"/>
                <OrderNow /> */}
            </div>
            <FooterV2 />
        </div>
    )
}