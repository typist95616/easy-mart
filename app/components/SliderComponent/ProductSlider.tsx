import "./ProductSlider.scss";
import ProductCard from "../productCard";
import orange from "../images/orange.png";
import rightArrow from "../../../public/images/right-button.png";
import leftButton from "../../../public/images/left-button.png";
import rightButton from "../../../public/images/right-button.png"
import { useEffect, useRef, useState } from "react";
import { Product } from "../../types/Product";
import Image from "next/image";
import Slider from "react-slick";

interface ProductSliderProps {
    class?: string;
    title: string;
}

export default function ProductSlider(props: ProductSliderProps) {

    const [products, setProducts] = useState<Product[]>([]);
    const [filter, setFilter] = useState([]);
    const sliderRef = useRef<Slider | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Get data from database
    const fetchProducts = async () => {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
    }

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    // slick slider setting
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        arrows: false,
        
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
                // mobile version, show dots
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true
                }
            }
        ]
    }

    return (
        <div className="whole-productSlider-root">
            <div className={props.title === "Best Seller" ? "productSlider-secondLayer" : "trending-border productSlider-secondLayer"}>
                <div className="productSlider-top">
                    <div className="productSlider-title">{props.title}</div>
                    <div className={props.title === "Best Seller" ? "best-seller productSlider-rightItem" : "trending productSlider-rightItem"}>
                        <div className="productSlider-viewAll-button">
                            <div className="productSlider-viewAll-text">
                                <div className="productSlider-viewAll-text-left">View All</div>
                                <div className="productSlider-viewAll-text-right">(+40)</div>
                            </div>
                            <Image src={rightArrow} alt="right-arrow" className="productSlider-viewAll-icon" />
                        </div>
                        <div className="productSlider-arrowGroup">
                            <div className="prodcutSlider-leftArrowButton" onClick={() => sliderRef.current?.slickPrev()} style={{ cursor: "pointer" }}>
                                <Image src={leftButton} alt="left-arrow-button" className="prodcutSlider-leftArrow" width={24} height={24}></Image>
                            </div>
                            <div className="prodcutSlider-rightArrowButton" onClick={() => sliderRef.current?.slickNext()} style={{ cursor: "pointer" }}>
                                <Image src={rightButton} alt="right-arrow-button" className="prodcutSlider-rightArrow" width={24} height={24}></Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productSlider-bottom">
                    <Slider ref={sliderRef} {...settings} key={products.length}>
                        {products.map((product) =>
                            <ProductCard
                                productName={product.name}
                                productImage={product.img_url}
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