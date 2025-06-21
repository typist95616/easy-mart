"use client";

import FooterV2 from '../../components/FooterV2';
import ProductSlider from "../../components/SliderComponent/ProductSlider";
import "./main.css";
import NavbarV2 from '@/app/components/NavBarV2';
import { useCurrentUser } from "../../Context/CurrentUserContext";
import { useAtom } from 'jotai';
import { tokenAtom } from "../../Context/TokenAtom";
import ImageSlider from "../../components/SliderComponent/StandaloneImageSlider";

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

    return (
        <div>
            <NavbarV2 className="whole-navbar-v2"/>
            {/* {currentUser?.email} */}
            {/* {tokenValue} */}
            <div className='main-content'>
                <ImageSlider images={images}></ImageSlider>
                <ImageSlider images={images}></ImageSlider>
                {/* <Banner /> */}
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