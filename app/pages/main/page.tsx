"use client";

import FooterV2 from '../../components/FooterV2';
import Banner from '../../components/banner';
import ProductSlider from "../../components/SliderComponent/ProductSlider";
import "./main.css";
import NavbarV2 from '@/app/components/NavBarV2';
import { useCurrentUser } from "../../Context/CurrentUserContext";
import { useAtom } from 'jotai';
import { tokenAtom } from "../../Context/TokenAtom";

export default function Home() {

    const { currentUser } = useCurrentUser();
    console.log("User: ", JSON.stringify(currentUser, null, 2)); // Pretty print the user object
    const [tokenValue, setToken] = useAtom(tokenAtom);

    return (
        <div>
            <NavbarV2 className="whole-navbar-v2"/>
            {/* {currentUser?.email} */}
            {tokenValue}
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