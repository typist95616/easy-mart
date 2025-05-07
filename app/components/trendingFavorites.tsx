import { useEffect, useRef, useState } from "react";
import "../components/trendingFavorites.css"
import { Product } from "../types/Product";
import ProductCard from "./productCard";
import apple from "../images/apple.png";
import rightArrow from "../images/arrow-right.png";
import Image from "next/image";
import Slider from "react-slick";
import leftButton from "../images/left-button.png";
import rightButton from "../images/right-button.png";

export default function TrendingFavorites({ bgColor }: { bgColor?: string }) {

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);
    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        arrows: false,
        afterChange: (index: number) => {
            setCurrentSlide(index);
        },
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                }
            },
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
                }
            },            
            {
                breakpoint: 650,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
            }
        ]
    }

    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [filter]);
    
    return (
        <div className={`trendingBox-padding ${bgColor ? bgColor : ""}`}>
            <div className="whole-trendingBox">
                <div className="trendingBox-header">
                    <h1 className="trendingBox-h1">Trending Store Favorites</h1>
                    <div className="trendingBox-spacer"></div>
                    <div className="productSlider-viewAll-button">
                            <div className="productSlider-viewAll-text">View All</div>
                            <Image src={rightArrow} alt="right-arrow" className="productSlider-viewAll-icon"/>
                    </div>
                </div>
                <div className="trendingBox-secondLine">
                    <div className="trendingBox-spacer"></div>
                    <div className="productSlider-arrowGroup">
                        <div className="prodcutSlider-leftArrowButton"  onClick={() => sliderRef.current?.slickPrev()} style={{ cursor: "pointer" }}>
                            <Image src={leftButton} alt="left-arrow-button" className="prodcutSlider-leftArrow" width={24} height={24}></Image>
                        </div>
                        <div className="prodcutSlider-rightArrowButton" onClick={() => sliderRef.current?.slickNext()} style={{ cursor: "pointer" }}>
                            <Image src={rightButton} alt="right-arrow-button" className="prodcutSlider-rightArrow" width={24} height={24}></Image>
                        </div>
                    </div>
                </div>
                <div className="productSlider-slider">
                    <Slider {...settings} ref={sliderRef} key={products.length}>
                        {products.map((product) => 
                            <ProductCard 
                                productName={product.name}
                                productImage={apple}
                                pricePerLb={product.price_per_lb}
                                totalPrice={product.total_price}
                                stock={product.stock}
                            />
                        )}
                    </Slider>
                </div>
            </div>
        </div>

    )
}