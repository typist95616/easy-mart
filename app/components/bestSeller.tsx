import "./bestSeller.css";
import ProductCard from "./productCard";
import orange from "../images/orange.png";
import rightArrow from "../images/arrow-right.png";
import leftButton from "../images/left-button.png";
import rightButton from "../images/right-button.png"
import { useEffect, useRef, useState } from "react";
import { Product } from "../types/Product";
import Image from "next/image";
import Slider from "react-slick";

export default function ProductSlider() {

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);
    const sliderRef = useRef<Slider | null>(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: false
    };

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    return (
        <div className="whole-productSlider">
            <div className="productSlider-header">
                <div className="productSlider-title">Best Seller</div>
                <div className="productSlider-header-spacer"></div>
                <div className="productSlider-viewAll-button">
                    <div className="productSlider-viewAll-text">View All (+40)</div>
                    <Image src={rightArrow} alt="right-arrow" className="productSlider-viewAll-icon"/>
                </div>
                <div className="productSlider-arrowGroup">
                    <div className="prodcutSlider-leftArrowButton"  onClick={() => sliderRef.current?.slickPrev()} style={{ cursor: "pointer" }}>
                        <Image src={leftButton} alt="left-arrow-button" className="prodcutSlider-leftArrow" width={24} height={24}></Image>
                    </div>
                    <div className="prodcutSlider-rightArrowButton" onClick={() => sliderRef.current?.slickNext()} style={{ cursor: "pointer" }}>
                        <Image src={rightButton} alt="right-arrow-button" className="prodcutSlider-rightArrow" width={24} height={24}></Image>
                    </div>
                </div>
            </div>
            <Slider ref={sliderRef} {...settings}>
                {products.map((product) => 
                    <ProductCard 
                        productName={product.name}
                        productImage={orange}
                        pricePerLb={product.price_per_lb}
                        totalPrice={product.total_price}
                        stock={product.stock}
                    />
                )}
            </Slider>
        </div>
    )
}