"use client";

import FooterV2 from '../../components/FooterV2';
import Banner from '../../components/banner';
import ProductSlider from "../../components/SliderComponent/ProductSlider";
import "./main.css";
import NavbarV2 from '@/app/components/NavBarV2';

export default function Home() {

    return (
        <div>
            <NavbarV2 className="whole-navbar-v2"/>
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