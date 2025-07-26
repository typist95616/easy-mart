"use client";

import FooterV2 from './components/FooterV2';
import ProductSlider from "./components/SliderComponent/ProductSlider";
import "./main.css";
import NavbarV2 from '@/app/components/NavBarV2';
import { useCurrentUser } from "./Context/CurrentUserContext";
import { useAtom } from 'jotai';
import { tokenAtom } from "./Context/TokenAtom";
import ImageSlider from "./components/SliderComponent/StandaloneImageSlider";
import ProductImageSlider from '@/app/components/ProductImageSlider';
import { useEffect, useState } from 'react';
import { Product } from '@/app/types/Product';

const images = [
    "../images/poster1.png",
    "../images/poster2.png",
    "../images/poster3.png",
    "../images/poster4.png",
    "../images/poster5.png",
    "../images/poster1.png",
    "../images/poster2.png",
    "../images/poster3.png",
    "../images/poster4.png",
    "../images/poster5.png",
]

export default function Home() {

    const { currentUser } = useCurrentUser();
    console.log("User: ", JSON.stringify(currentUser, null, 2)); // Pretty print the user object
    const [tokenValue, setToken] = useAtom(tokenAtom);

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);

    // Get data from database
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
            <NavbarV2 className="whole-navbar-v2" />
            {/* {currentUser?.email} */}
            {/* {tokenValue} */}
            <div className='main-content'>
                <div>
                    <ImageSlider images={images} direction={"left"}></ImageSlider>
                    <ImageSlider images={images} direction={"right"}></ImageSlider>
                </div>
                {/* <Banner /> */}
                {/* <BestSeller Title="Best Seller"/> */}
                {/* {/* <ProductSlider title="Best Seller"></ProductSlider> */}
                {/* <ProductSlider title="Trending Store Favourites"></ProductSlider> */}
                {/* <TrendingFavorites bgColor="whiteBackground"/>
                <OrderNowYourGrocery />
                <TrendingFavorites bgColor="greyBackground"/>
                <OrderNow /> */}
                <ProductImageSlider
                    title="Best Seller"
                    headingStyle={{
                        fontSize: "20px",
                    }}>
                </ProductImageSlider>
                <ProductImageSlider
                    title="Trending Store Favorites"
                    containerStyle={{
                        border: "1px solid #F0EEF0",
                        padding: "24px",
                        borderRadius: "32px",
                    }}
                    headingStyle={{
                        fontSize: "24px",

                    }}>
                </ProductImageSlider>
            </div>
            <FooterV2 />
        </div>
    )
}